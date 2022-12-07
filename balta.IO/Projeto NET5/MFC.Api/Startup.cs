using MFC.Domain.ContractContext.Handlers;
using MFC.Domain.ContractContext.Repositories;
using MFC.Infra.StoreContext.DataContexts;
using MFC.Infra.StoreContext.Repository;
using MFC.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.IO;

namespace FCA.Api
{
    public class Startup
    {

        public static IConfiguration Configuration { get; set; }
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            services.AddControllers();

            //Utilizando Compressao dos Responses
            services.AddResponseCompression();

            services.AddTransient<DataContext, DataContext>();
            services.AddTransient<IContractRepository, ContractRepository>();
            services.AddTransient<ContractHandler, ContractHandler>();

            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "Motor Fleet Contract Api", Version = "v1" });
            });

            Settings.ConnectionString = $"{Configuration["ConnectionString"]}";
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();             
            }

            //habilitando Swagger para a versão 2
            app.UseSwagger(c => c.SerializeAsV2 = true);
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "Motor Fleet Contract Api - v1");
                // c.RoutePrefix = string.Empty;
            });

            //app.UseHttpsRedirection();            

            app.UseRouting();
            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });        
           
        }
    }
}
