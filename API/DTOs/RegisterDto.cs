using System.ComponentModel.DataAnnotations;
    /*
    “Un objeto que transporta datos entre procesos para reducir el número
    de llamadas a métodos”. Como veremos, esta definición se ha ido ampliando
    a medida que se han ido encontrando nuevas aplicaciones a la idea del DTO.

    Desde el punto de vista de código, un DTO es simplemente una clase sencilla
    on un conjunto de propiedades que permiten almacenar datos.
    */
namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4)]
        //[Phone] se puede utilizar expreciones regulares, o tipos ya hechos y asi
        public string password { get; set; }
    }
}