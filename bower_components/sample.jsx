var movieData=[];
var SearchMovies=React.createClass({
getInitialState: function() {
  return {data: '',name:this.props.name};
},

render:function(){
  return (

<div className="container">
  <div className="jumbotron text-center">
  <h1>My Movie Details</h1>
</div>

  <div className="col-lg-8">
  <input className="form-control" type="text" id="a" placeholder="enter movie name" required="please enter movie name" value={this.props.name} onChange={this.movieName}/>
  </div>
  <div className="col-lg-4">
  <input className="btn btn-success" type="submit" value="Search" onClick={this.searchOMDB}/><br/>
  </div>
    <PreviousSearch />
  </div>
  );
},
movieName:function(e){
this.props.name=e.target.value;
},
searchOMDB:function(){
var x="http://www.omdbapi.com/?s="+document.getElementById('a').value+"&plot=full&r=json";
$.ajax({
      url: x,
      dataType: 'json',
      success: function(data) {
        if(data.Search!=undefined){
          console.log(data);
          data.Search.map(function(d){
              movieData.push(d);
          })
        }
        this.setState({data:data,name:''});
      }.bind(this)
    });
}
});



var PreviousSearch=React.createClass({
  getInitialState: function() {
    return {movie:''};
  },
render:function(){
  var add =this;
   var z=this.state.movie;
    return(
      <div className="col-lg-12">
       {movieData.map(function(d){
         return (

           <div className="col-lg-12 well">
            <div className="col-lg-4">
              <img src={d.Poster} alt="No Poster Available"/>
            </div>
            <div className="col-lg-8">
              <h4>{d.Title}</h4>
            <h4>Year: {d.Year}</h4>
              <h4>imdbid: {d.imdbID}</h4>
              <p>
              <button className="btn btn-primary" type="submit"  data-toggle="modal" data-target="#myModal" value={d.imdbID} onClick={add.newone}>Movie details</button>
              <button type="button" className="btn btn-info" onClick={add.updating}>updating</button>
                <button type="button" className="btn btn-warning" onClick={add.deleting}>deleting</button>
              </p>
            </div>
           </div>
         );
       })}

      <div className="container">

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog" style={{width:'90%'}}>

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">movie</h4>
              </div>
              <div className="modal-body">
              <div className="col-lg-12">
               <div className="col-lg-4">
                 <img src={z.Poster} alt="No Poster Available"/>
               </div>
               <div className="col-lg-8">
                 <h4>{z.Title}</h4>
               <h4>Year: {z.Year}</h4>
                <h4>Description:</h4><h5>{z.Plot}</h5>
                <button type="button" className="btn btn-danger" onClick={add.database}>Add to Database</button>
               </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      </div>

    );
},

newone:function(s){
  console.log(s.target.value);
var x="http://www.omdbapi.com/?i="+s.target.value+"&plot=short&r=json";
$.ajax({
      url: x,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        this.setState({movie:data});
      }.bind(this)
    });
},

database: function(comment) {
    $.ajax({
      url:'/users2/mpk' ,
      dataType: 'json',
      type: 'POST',
      data: this.state.movie,
      success: function(data) {
        console.log("added data successfully");
      }.bind(this)
    });
  },

  updating: function(c1) {
    var x="http://www.omdbapi.com/?i="+c1.target.value+"&plot=short&r=json";
      $.ajax({
        url:'/users2/updatefindbyid' ,
        dataType: 'json',
        type: 'GET',
        data: this.state.movie,
        success: function(data) {
          console.log("updated data successfully");
        }.bind(this)
      });
    },

    deleting: function(c2) {
      var x="http://www.omdbapi.com/?i="+c2.target.value+"&plot=short&r=json";
        $.ajax({
          url:'/users2/' ,
          dataType: 'json',
          type: 'GET',
          data: this.state.movie,
          success: function(data) {
            console.log("deleting data successfully");
          }.bind(this)
        });
      },

});

ReactDOM.render(<SearchMovies name=''/>,document.getElementById("content"));
