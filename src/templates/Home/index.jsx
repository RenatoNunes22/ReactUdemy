import { Component } from "react";
import "./styles.css";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-post";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + 3);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosted = !!searchValue
      ? posts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>SEARCH VALUE: {searchValue}</h1>}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosted.length > 0 && <Posts posts={filteredPosted} />}
        {filteredPosted.length === 0 && <p>NÃO EXISTE POSTS</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              text="load more"
              onclick={this.loadMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
export default Home;
