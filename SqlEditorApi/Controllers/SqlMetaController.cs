using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace SqlEditorApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class SqlMetaController : Controller
    {
        private readonly IConfiguration _configuration;

        public SqlMetaController( IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("tables")]
        public IActionResult GetTables()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            var tables = new List<string>();

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var cmd = new SqlCommand(
                    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'", connection);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        tables.Add(reader.GetString(0));
                    }
                }
            }
            return Ok(tables);
        }

        [HttpGet("columns/{tableName}")]
        public IActionResult GetColumns(string tableName)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            var columns = new List<string>();

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var cmd = new SqlCommand(
                    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName", connection);
                cmd.Parameters.AddWithValue("@tableName", tableName);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        columns.Add(reader.GetString(0));
                    }
                }
            }
            return Ok(columns);
        }

    }
}
