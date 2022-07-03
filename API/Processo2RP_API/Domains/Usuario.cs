using System;
using System.Collections.Generic;

#nullable disable

namespace Processo2RP_API.Domains
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool UserStatus { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
    }
}
