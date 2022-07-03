using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo2RP_API.ViewModel
{
    public class BuscaUsuarioViewModel
    {
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool UserStatus { get; set; }
    }
}
