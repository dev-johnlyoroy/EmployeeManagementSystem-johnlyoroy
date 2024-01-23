using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Threading;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using ems.api.Utility;

namespace ems.api.Authorization
{
    public class Authorizations : Attribute, IAuthenticationFilter
    {
        //indicates whether multiple inctanse of the 
        public bool AllowMultiple => false;

        //authenticates the incoming request using JWT token and API key/secret validation.

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization == null || authorization.Scheme != "Bearer")
            {
                context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                return;
            }


            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                return;
            }

            var token = authorization.Parameter;
            var principal = await AuthenticateToken(token, context);

            if (principal == false)
            {
                context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
            }
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }

        // Validates the provided JWT token and checks the associated API key and secret.
        protected Task<Boolean> AuthenticateToken(string token, HttpAuthenticationContext context)
        {
            if (ValidateToken(token))
            {
                string apikey = new AuthTokenParser(context.Request).ReadValue("api_key");
                string apisecret = new AuthTokenParser(context.Request).ReadValue("api_secret");
                if (apikey == "ems" && apisecret == "emssecret")
                    return Task.FromResult<Boolean>(true);

            }

            return Task.FromResult<Boolean>(false);
        }

        // Validates the JWT token by checking its claims and authentication status.
        private bool ValidateToken(string token)
        {
            var simplePrinciple = JwtManager.GetPrincipal(token);

            if (simplePrinciple == null)
                return false;

            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;
            // More validate to check whether username exists in system

            return true;
        }
    }
}