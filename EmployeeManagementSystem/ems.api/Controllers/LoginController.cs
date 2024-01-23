using ems.api.Controllers.BaseController;
using ems.api.Utility;
using ems.data_access.Database;
using ems.library.Managers;
using ems.library.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ems.api.Controllers
{
    public class LoginController : ApiBaseController
    {
        
        /// <summary>
        /// User SignIn using JSON
        /// </summary>
        /// <returns>Sign in using json body</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST signin/bodymodel
        ///     {
        ///        "username": "username",
        ///        "password": "password"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Returns the bearer token</response>
        /// <response code="400">If the item is null</response>
        [AllowAnonymous]
        [Route("signin")]
        [HttpPost]
        public IHttpActionResult bodymodel([FromBody] LoginDTO model)
        {
            AccountManager am = new AccountManager(Worker);
            string token = "";

            Dictionary<string, string> payloads = new Dictionary<string, string>();
            payloads["api_key"] = "ems";
            payloads["api_secret"] = "emssecret";
            payloads["username"] = model.username;
            payloads["password"] = model.password;


            var account = am.GetAllActiveUser().Where(x => x.Username == model.username && x.Password == model.password).FirstOrDefault();

            if (account != null)
            {
                token = JwtManager.GenerateToken(payloads);

                if (token != null)
                {
                    am.SetToken(account.ID, token);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

            return Ok(token);
        }


        [AllowAnonymous]
        [Route("logout")]
        [HttpPost]
        public IHttpActionResult Logout()
        {
            try
            {
                

                // send a success response
                return Ok("Logout successful");
            }
            catch (Exception ex)
            {
                // log the error
                
                return InternalServerError(ex);
            }
        }

    }
}
