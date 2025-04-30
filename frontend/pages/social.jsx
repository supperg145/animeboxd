import { FiUsers, FiMessageSquare, FiHeart, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { FaComment, FaRetweet, FaRegBookmark } from 'react-icons/fa';
const Social = () => {
  // Mock data for posts
  const posts = [
    {
      id: 1,
      username: 'anime_lover42',
      avatar: '/default-avatar.png',
      content: 'Just finished watching Attack on Titan Final Season! Mind = blown 🤯 #AOT #Anime',
      timestamp: '2h ago',
      likes: 245,
      comments: 38,
      shares: 12,
      isLiked: false,
    },
    {
      id: 2,
      username: 'cosplay_queen',
      avatar: '/default-avatar.png',
      content: 'Working on my new Demon Slayer Nezuko cosplay! Can you guess which scene this is from? 👀 #DemonSlayer #Cosplay',
      image: '/cosplay-wip.jpg',
      timestamp: '5h ago',
      likes: 512,
      comments: 47,
      shares: 23,
      isLiked: true,
    },
    {
      id: 3,
      username: 'otaku_gamer',
      avatar: '/default-avatar.png',
      content: 'Which anime should I watch next? I just finished Steins;Gate and need something equally mind-bending!',
      timestamp: '1d ago',
      likes: 89,
      comments: 62,
      shares: 5,
      isLiked: false,
    },
  ];

  // Mock data for friends
  const friends = [
    { id: 1, username: 'manga_fan', avatar: '/default-avatar.png', status: 'online' },
    { id: 2, username: 'weeb_artist', avatar: '/default-avatar.png', status: 'online' },
    { id: 3, username: 'japan_traveler', avatar: '/default-avatar.png', status: 'offline' },
    { id: 4, username: 'anime_photographer', avatar: '/default-avatar.png', status: 'online' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">Anime Community</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition">
              <FiUsers className="text-xl" />
            </button>
            <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition">
              <FiMessageSquare className="text-xl" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Friends */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-indigo-900 mb-4">Friends</h2>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-indigo-50 rounded-lg transition cursor-pointer">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={friend.avatar} 
                          alt={friend.username} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      </div>
                      <span className="ml-3 text-indigo-900 font-medium">{friend.username}</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiMessageSquare />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition font-medium">
                View All Friends
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-900 mb-4">Trending</h2>
              <div className="space-y-3">
                {['#NewAnimeSeason', '#CosplayContest', '#AnimeArt', '#MangaRecommendations'].map((tag, index) => (
                  <div key={index} className="p-3 hover:bg-indigo-50 rounded-lg transition cursor-pointer">
                    <div className="font-medium text-indigo-900">{tag}</div>
                    <div className="text-sm text-gray-500">{(index + 1) * 245} posts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start space-x-3">
                <img 
                  src="/default-avatar.png" 
                  alt="Your profile" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea 
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Share your anime thoughts..."
                    rows="3"
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.avatar} 
                        alt={post.username} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-indigo-900">{post.username}</div>
                        <div className="text-xs text-gray-500">{post.timestamp}</div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreHorizontal />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    {post.image && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
                    <button className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition`}>
                      <FiHeart className={post.isLiked ? 'fill-current' : ''} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition">
                      <FaComment />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition">
                      <FaRetweet />
                      <span>{post.shares}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition">
                      <FaRegBookmark />
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition">
                      <FiShare2 />
                    </button>
                  </div>

                  {/* Comment Input (mock) */}
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center">
                    <img 
                      src="/default-avatar.png" 
                      alt="Your profile" 
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      className="flex-1 bg-gray-50 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;