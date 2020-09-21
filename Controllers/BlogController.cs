using System;
using System.Collections.Generic;
using System.Linq;
using AngularWebApplication.Models;
using EFGetStarted;
using Microsoft.AspNetCore.Mvc;

namespace AngularWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        public BlogController()
        {

        }

        [HttpGet]
        public List<BlogViewModel> Get()
        {
            List<BlogViewModel> result;
            using (var db = new BloggingContext())
            {
                result = (from b in db.Blogs
                           join c in db.Posts on b.BlogId equals c.BlogId
                           orderby b.BlogId
                           select new BlogViewModel
                           {
                               BlogId = b.BlogId,
                               PostId = c.PostId,
                               Url = b.Url,
                               Title = c.Title,
                               Content = c.Content
                           }).ToList();
            }

            return result;
        }

        [HttpGet]
        [Route("Curd")]
        public void Curd()
        {
            using (var db = new BloggingContext())
            {
                // Create
                Console.WriteLine("Inserting a new blog");
                db.Add(new Blog { Url = "http://blogs.msdn.com/adonet" });
                db.SaveChanges();

                // Read
                Console.WriteLine("Querying for a blog");
                var blog = db.Blogs
                    .OrderBy(b => b.BlogId)
                    .First();

                // Update
                Console.WriteLine("Updating the blog and adding a post");
                blog.Url = "https://devblogs.microsoft.com/dotnet";
                blog.Posts.Add(
                    new Post
                    {
                        Title = "Hello World",
                        Content = "I wrote an app using EF Core!"
                    });
                db.SaveChanges();

                // Delete
                Console.WriteLine("Delete the blog");
                db.Remove(blog);
                db.SaveChanges();
            }
        }
    }
}

