import React from "react";

const ProfilePosts = ({ posts }) => {
    console.log('lll',posts)
    let post;
    if(posts){
        post=posts
    }else{
         post = [
            { id: 1, src: "https://via.placeholder.com/150" },
            { id: 2, src: "https://via.placeholder.com/150" },
            { id: 3, src: "https://via.placeholder.com/150" }
          ];
    }
      return (
        <div className="p-4 grid grid-cols-3 gap-1">
          {post.map((item) => (
            <img key={item.id} src={item.image||item.src} alt={`Post ${item.id}`} className="w-full" />
          ))}
        </div>
      );
    }

export default ProfilePosts