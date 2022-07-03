using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Processo2RP_API.ViewModel
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe um  e-mail de usuário!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe uma senha de usuário!")]
        public string Senha { get; set; }
    }
}
