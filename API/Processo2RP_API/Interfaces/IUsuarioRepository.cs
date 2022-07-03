using Processo2RP_API.Domains;
using Processo2RP_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo2RP_API.Interfaces
{
    public interface IUsuarioRepository
    {
        void CadastrarUsuario(UsuarioViewModel novoUsuario);
        void AtualizarUsuario(UsuarioViewModel novoUsuario, int idUsuario);
        bool DeletarUsuario(int idUsuario);
        bool AlterarStatus(int idUsuario);
        Usuario Login(string email, string senha);
        BuscaUsuarioViewModel BuscarUsuario(int idUsuario);
        IEnumerable<Usuario> Listar();
    }
}
