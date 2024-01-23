using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace ems.api.Utility
{
    public class JwtManager
    {
        private const string Secret = "YZeUf+4vWcd8mzpPVRMPc/KlVshj4l9Hs0pZmrqAnvMlnVmqF9jyR+dYix/gBiphsEctf42RrczEQk9UDjPX4FjyPk2pPeMjTFdvQY1Iq1vfhKhJ8t3p8wIfhO3n+/QS7vyTV5DaJN1E0/w83x3YYaVXdPwfNe5nkkX9owYnQ5U=";

        public static string GenerateToken(Dictionary<string, string> payloads, int expireMinutes = 1)
        {
            var symmetricKey = Convert.FromBase64String(Secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;

            List<Claim> claims = new List<Claim>();

            foreach (KeyValuePair<string, string> kpv in payloads)
                claims.Add(new Claim(kpv.Key, kpv.Value));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims.ToArray()
                ),

                Expires = now.AddMinutes(expireMinutes),
                NotBefore = now,
                IssuedAt = now,

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
            };

            // Assume "Taipei Standard Time" is the time zone for Taipei
            var taipeiTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Taipei Standard Time");

            // Convert expiration time to Taipei time
            var expirationTaipei = TimeZoneInfo.ConvertTimeFromUtc(now, taipeiTimeZone);

            Debug.WriteLine($"Token Expiration (GENERATE): {expirationTaipei}");

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(Secret);

                Debug.WriteLine(String.Format("JWTManager > GetPrincipal > Validating Token: {0}", token));
                foreach (Claim claim in jwtToken.Claims)
                {
                    Debug.WriteLine(String.Format("JWTManager > GetPrincipal > Claims: {0}", claim.ToString()));
                }

                var validationParameters = new TokenValidationParameters()
                {
                    //RequireExpirationTime = true,
                    ValidateLifetime = false, //SET IT TO FALSE TO HAVE NO EXPIRATION
                    ClockSkew = TimeSpan.Zero, //TO HAVE ACCURATE EXPIRATION TIME
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
                };

                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

                if (securityToken is JwtSecurityToken jwtSecurityToken)
                {
                    var expirationUtc = jwtSecurityToken.ValidTo;

                    // Assume "Taipei Standard Time" is the time zone for Taipei
                    var taipeiTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Taipei Standard Time");

                    // Convert expiration time to Taipei time
                    var expirationTaipei = TimeZoneInfo.ConvertTimeFromUtc(expirationUtc, taipeiTimeZone);

                    Debug.WriteLine($"Token Expiration (UTC): {expirationUtc}");
                    Debug.WriteLine($"Token Expiration (VALIDTO): {expirationTaipei}");
                }

                return principal;
            }

            catch (Exception ex)
            {
                //should write log
                return null;
            }
        }
    }
}