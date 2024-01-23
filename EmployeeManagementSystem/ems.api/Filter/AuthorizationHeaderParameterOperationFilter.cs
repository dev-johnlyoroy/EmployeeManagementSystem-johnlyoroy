using ems.api.Authorization;
using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Description;

namespace ems.api.Filter
{
    public class AuthorizationHeaderParameterOperationFilter : IOperationFilter
    {
        //applies the filter to the swagger operation
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {

            //check the api operation is authorized
            var filterPipeline = apiDescription.ActionDescriptor.GetFilterPipeline();
            var isAuthorized = filterPipeline
                .Select(filterInfo => filterInfo.Instance)
                .Any(filter => filter is Authorizations);

            if (isAuthorized)
            {
                if (operation.parameters == null)
                {
                    operation.parameters = new List<Parameter>();
                }

                //add authorization header parameter details
                operation.parameters.Add(new Parameter
                {
                    name = "Authorization",
                    @in = "header",
                    description = "Bearer token",
                    required = true,
                    @default = "Bearer ",
                    type = "string"
                });
            }
        }
    }
}