using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;

namespace ems.api.Utility
{
    public class AuthTokenParser
    {
        private ClaimsIdentity _claims = null;


        public AuthTokenParser(HttpRequestMessage request)
        {
            var authorization = request.Headers.Authorization;
            var token = authorization.Parameter;
            var simplePrinciple = JwtManager.GetPrincipal(token);
            _claims = simplePrinciple.Identity as ClaimsIdentity;
        }

        public string ReadValue(string key)
        {
            var claimvalue = _claims.FindFirst(key);
            return claimvalue?.Value;
        }


    }
}