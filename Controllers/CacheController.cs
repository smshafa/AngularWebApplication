using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace AngularWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheController : ControllerBase
    {
        public interface IRedis
        {
            string Key { set; get; }
            string Value { set; get; }
        }

        private readonly IDatabase _database;
        private readonly IServer _server;

        public CacheController(IDatabase database, IServer server)
        {
            _database = database;
            _server = server;
        }

        // GET: api/Cache?key=key
        [HttpGet]
        public string Get([FromQuery] string key)
        {
            return _database.StringGet(key);            
        }

        // POST: api/Cache
        [HttpPost]
        public void Post([FromBody] KeyValuePair<string, string> keyValue)
        {
            _database.StringSet(keyValue.Key, keyValue.Value);
        }
       

        [HttpGet]
        [Route("GetAll")]
        public List<KeyValuePair<string, string>> GetAll()
        {
            Dictionary<string, string> keys = new Dictionary<string, string>();
            foreach (var key in _server.Keys())            
                keys.Add(key.ToString(),  _database.StringGet(key));
            
            return keys.ToList();
        }
    }
}
