import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail.js';
const API_KEY='AIzaSyC-ZjrDIfqaonBMD-6rj_2ablhQVuYpZNs';

//create new component to produce some HTML
class App extends Component{
  constructor(props){
    super(props);

    this.state={videos:[],
        selectedVideo:null
    };
    this.videoSearch('LebronJames');
  }
  videoSearch(term){
    //YTSearch() is just a function, call it by YTSearch(object, callback);
    YTSearch ({key:API_KEY,term:term},(data) => {
      this.setState({videos:data,
        selectedVideo:data[0]
      });
    });
  }
  render(){
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)}, 300);
    return (
    <div>
    <SearchBar onSearchTermChange={videoSearch} />
    <VideoDetail video={this.state.selectedVideo}/>
    <VideoList
    onVideoSelect={(selectedVideo)=>this.setState({selectedVideo})}
    videos={this.state.videos} />
    </div>
  );
  }
}

//take this component and make HTML, put it in the dom(page)
ReactDom.render(<App />,document.querySelector('.container'));
