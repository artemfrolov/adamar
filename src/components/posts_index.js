import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {

  componentWillMount(){
    this.props.fetchPosts();
  }

  onDeleteClick(id) {
    console.log(id);
    this.props.deletePost(id)
    .then(() => {
      this.props.fetchPosts();
    });
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
          <button onClick={this.onDeleteClick.bind(this, post.id)}>DELETE</button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add Post
          </Link>
        </div>
        <h3>Postst</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect (mapStateToProps, { fetchPosts, deletePost })(PostsIndex);
