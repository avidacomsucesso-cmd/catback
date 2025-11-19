import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {/* Placeholder for image */}
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-catback-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <CardHeader className="flex-grow pb-2">
        <CardTitle className="text-xl font-bold hover:text-catback-purple transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">{post.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-500">{post.date}</p>
        <Link to={`/blog/${post.slug}`} className="flex items-center text-catback-purple text-sm font-semibold hover:text-catback-dark-purple">
          Ler Mais <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;