using System;
using System.Data;
using Microsoft.Data.SqlClient;
using MFC.Shared;

namespace MFC.Infra.StoreContext.DataContexts
{
    public class DataContext : IDisposable
    {
        public SqlConnection connection { get; set; }

        public DataContext()
        {
            connection = new SqlConnection(Settings.ConnectionString);
            connection.Open();
        }
    
        public void Dispose()
        {
            if (connection.State != ConnectionState.Closed)
                connection.Close();
        }
    }


}
