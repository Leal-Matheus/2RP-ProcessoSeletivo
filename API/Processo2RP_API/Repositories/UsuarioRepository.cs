using Microsoft.EntityFrameworkCore;
using Processo2RP_API.Contexts;
using Processo2RP_API.Domains;
using Processo2RP_API.Interfaces;
using Processo2RP_API.Utils;
using Processo2RP_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo2RP_API.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
         Processo_Context ctx = new Processo_Context();
        public bool AlterarStatus(int idUsuario)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
            if (usuario != null)
            {
                switch (usuario.UserStatus)
                {
                    case true:
                        usuario.UserStatus = false;
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();
                        break;
                    case false:
                        usuario.UserStatus = true;
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();
                        break;
                }
                return true;
            }
            return false;
        }

        public void AtualizarUsuario(UsuarioViewModel novoUsuario, int idUsuario)
        {
            if (novoUsuario != null)
            {
                Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
                string senhaHash = Criptografia.GerarHash(novoUsuario.Senha);

                usuario.Email = novoUsuario.Email;
                usuario.Senha = senhaHash;
                usuario.Nome = novoUsuario.Nome;
                usuario.UserStatus = novoUsuario.UserStatus;
                usuario.IdTipoUsuario = novoUsuario.IdTipoUsuario;

                ctx.Usuarios.Update(usuario);
                ctx.SaveChanges();
            }
        }
        public void AtualizarMeuUsuario(UsuarioAtualizadoViewModel novoUsuario, int idUsuario)
        {
            if (novoUsuario != null)
            {
                Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
                string senhaHash = Criptografia.GerarHash(novoUsuario.Senha);

                usuario.Email = novoUsuario.Email;
                usuario.Senha = senhaHash;
                usuario.Nome = novoUsuario.Nome;

                ctx.Usuarios.Update(usuario);
                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);

            Usuario usuarioBag = new Usuario();
            usuarioBag.Email = usuario.Email;
            usuarioBag.Nome = usuario.Nome;
            usuarioBag.UserStatus = usuario.UserStatus;
            usuarioBag.Nome = usuario.Nome;
            return usuarioBag;
        }

        public void CadastrarUsuario(UsuarioViewModel novoUsuario)
        {
            if (novoUsuario.Nome != null && novoUsuario.Email != null && novoUsuario.Senha != null)
            {
                string senhaHash = Criptografia.GerarHash(novoUsuario.Senha);

                Usuario user = new Usuario();
                user.Nome = novoUsuario.Nome;
                user.Email = novoUsuario.Email;
                user.Senha = senhaHash;
                user.IdTipoUsuario = novoUsuario.IdTipoUsuario;
                user.UserStatus = novoUsuario.UserStatus;

                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
        }

        public bool DeletarUsuario(int idUsuario)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
            if (usuario == null) return false;

            ctx.Usuarios.Remove(usuario);
            ctx.SaveChanges();
            return true;
        }

        public Usuario Login(string email, string senha)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);
            if (usuario != null)
            {
                if (usuario.Senha.Length != 60 && usuario.Senha[0].ToString() != "$")
                {
                    if (senha == usuario.Senha)
                    {
                        string senhaHash = Criptografia.GerarHash(usuario.Senha);
                        usuario.Senha = senhaHash;
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();

                        return usuario;
                    }
                    else
                    {
                        return null;
                    }
                }

                bool confere = Criptografia.Comparar(senha, usuario.Senha);
                if (confere)
                    return usuario;
            }
            return null;
        }
        public IEnumerable<Usuario> Listar()
        {
            return ctx.Usuarios.Include(u => u.IdTipoUsuarioNavigation).ToList();
        }
    }
}
