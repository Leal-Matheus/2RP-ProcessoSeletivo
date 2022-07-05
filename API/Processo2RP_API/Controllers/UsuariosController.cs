using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Processo2RP_API.Domains;
using Processo2RP_API.Interfaces;
using Processo2RP_API.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Processo2RP_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuariosController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [Authorize(Roles = "2, 3")]
        [HttpPost]
        public IActionResult CadastrarUsuario(UsuarioViewModel novoUsuario)
        {
            try
            {
                if (novoUsuario != null)
                {
                    _usuarioRepository.CadastrarUsuario(novoUsuario);
                    return StatusCode(201, new
                    {
                        Mensagem = $"usuario cadastrado: {novoUsuario.Nome}"
                    });
                }
                return BadRequest(new
                {
                    Mensagem = "Os dados inseridos são inválidos!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }

        }
        [Authorize(Roles = "2, 3")]
        [Authorize]
        [HttpPut("Alterar/id/{idUsuario:int}")]
        public IActionResult AtualizarUsuario(UsuarioViewModel novoUsuario, int idUsuario)
        {
            try
            {
                Usuario usuario = _usuarioRepository.BuscarPorId(idUsuario);

                if (usuario != null)
                {
                    if (novoUsuario != null)
                        _usuarioRepository.AtualizarUsuario(novoUsuario, idUsuario);
                }
                else
                {
                    return BadRequest();
                }

                return StatusCode(201, new
                {
                    Mensagem = $"usuario atualizado: {novoUsuario.Nome}"
                });

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }
        [Authorize]
        [HttpPut("AlterarMeu/id/{idUsuario:int}")]
        public IActionResult AtualizarMeuUsuario(UsuarioAtualizadoViewModel novoUsuario, int idUsuario)
        {
            try
            {
                Usuario usuario = _usuarioRepository.BuscarPorId(idUsuario);

                if (usuario != null)
                {
                    if (novoUsuario != null)
                        _usuarioRepository.AtualizarMeuUsuario(novoUsuario, idUsuario);
                }
                else
                {
                    return BadRequest();
                }

                return StatusCode(201, new
                {
                    Mensagem = $"usuario atualizado: {novoUsuario.Nome}"
                });

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        [Authorize(Roles = "2, 3")]
        [HttpPatch("AlterarStatus/id/{idUsuario:int}")]
        public IActionResult AlterarStatus(int idUsuario)
        {
            if (idUsuario > 0)
            {
                _usuarioRepository.AlterarStatus(idUsuario);
                return Ok(new
                {
                    Mensagem = "status alterado!"
                });
            }
            return BadRequest(new
            {
                Mensagem = "Id inválido"
            });
        }

        [Authorize(Roles = "3")]
        [HttpDelete("Excluir/id/{idUsuario:int}")]
        public IActionResult ExcluirUsuario(int idUsuario)
        {
            if (idUsuario > 0)
            {
                if (_usuarioRepository.DeletarUsuario(idUsuario))
                {
                    return StatusCode(204, new
                    {
                        Mensagem = "O usuario foi excluido com sucesso!"
                    });
                }
                return StatusCode(404, new
                {
                    Mensagem = "O id informado não corresponde a um usuario"
                });
            }
            return BadRequest(new
            {
                Mensagem = "Id inválido"
            });
        }

        [Authorize]
        [HttpGet("Buscar/id/{idUsuario:int}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            if (idUsuario > 0)
            {
                int idTipoUserLogado = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value);
                int idLogado = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (idTipoUserLogado == 1)
                {
                    if (idLogado == idUsuario)
                    {
                        Usuario user = _usuarioRepository.BuscarPorId(idUsuario);
                        return Ok(user);
                    }

                    return StatusCode(403, new
                    {
                        Mensagem = "Você não possui autorização para buscar esse usuario!"
                    });
                }

                Usuario usuario = _usuarioRepository.BuscarPorId(idUsuario);
                if (usuario == null) return NotFound(new
                {
                    Mensagem = "Não existe um usuário com o id informado"
                });

                return Ok(usuario);
            }

            return BadRequest(new
            {
                Mensagem = "Id inválido!"
            });
        }
        //[Authorize (Roles = "2, 3")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_usuarioRepository.Listar());
        }

    }
}
