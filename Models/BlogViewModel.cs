using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebApplication.Models
{
    public class BlogViewModel
    {
        public int BlogId { set; get; }
        public int PostId { set; get; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
