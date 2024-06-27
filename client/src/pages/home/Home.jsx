import Stories from "../../components/stories/Stories"
import Share from "../../components/share/Share"
import "./home.scss"
import PostsBiasa from "../../components/posts/PostBiasa";

const Home = () => {
  return (
    <div className="home">
      <Stories/>
      <Share/>
      <PostsBiasa/>
    </div>
  )
}

export default Home