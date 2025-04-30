import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>About Us | AnimeTracker</title>
        <meta name="description" content="Learn more about AnimeTracker and our mission" />
      </Head>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
            About AnimeTracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your ultimate companion for tracking, discovering, and sharing your anime journey.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Mission</h2>
            <p className="text-gray-600">
              I created AnimeTracker to help anime enthusiasts organize their watchlist, 
              discover new shows, and connect with other fans. Our goal is to make anime 
              tracking seamless and enjoyable.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">X</span>
                Track watched episodes and progress
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">X</span>
                Personalized recommendations
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">X</span>
                Social sharing capabilities
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                Comprehensive anime database
              </li>
            </ul>
          </div>
        </div>

        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet The Team</h2>
          <div className="grid sm:grid-cols-1 gap-8">
            {[
              { name: 'Gabor Supper', role: 'Founder & Developer', bio: 'Anime enthusiast since childhood' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-purple-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;