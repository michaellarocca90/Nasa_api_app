import React, { Component } from 'react';
import {
    Table,
    PageHeader
} from 'react-bootstrap'
import space_station from './space_station.js'
import raw_data from './rawdata.js'

class App extends Component {
    constructor(props){
        super(props)
        let today = new Date()
        this.state = {
            asteroids: [],
            baseurl: "https://api.nasa.gov/neo/rest/v1/feed?start_date",
            start_date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
            api_key: "FqVbgU87wIs1PRF57yyfuS38XHHz4shFJcZWocge"
        }
    }

componentWillMount(){
    fetch(`${this.state.baseurl}=${this.state.start_date}&api_key=${this.state.api_key}`).then((rawResponse)=>{
        return rawResponse.json()
    }).then((parsedResponse) => {
        let neoData = parsedResponse.near_earth_objects
        let newAsteroids = []
        Object.keys(neoData).forEach((date) => (
            neoData[date].forEach((asteroid) => (
                newAsteroids.push({
                    name: asteroid.name,
                    ast_id: asteroid.neo_reference_id,
                    next_appr_date: asteroid.close_approach_data[0].close_approach_date,
                    distance_on_appr: asteroid.close_approach_data[0].miss_distance.miles,
                    avg_estimated_diameter: ((parseFloat(asteroid.estimated_diameter.feet.estimated_diameter_min) + parseFloat(asteroid.estimated_diameter.feet.estimated_diameter_max))/2).toFixed(0),
                    nerd_links: asteroid.nasa_jpl_url
                })
            ))
        ))
        this.setState({asteroids: newAsteroids})
    })

}

  render() {
    return (
        <div>
            <h1>Asteroid Properties: </h1>
            <p> This is a project created using React and the NASA Near Earth Object API. The following list is of near-eath objects tracked by NASA.
            <br />
            We created this app purely as a chance to learn more about APIs.
            <br />
            <br />
            - Nico DAmico and Mike LaRocca </p>
            <div id='table'>
            <table class="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Asteroid ID</th>
                      <th scope="col">Next Approach Date</th>
                      <th scope="col">Approach Distance(Miles from Earth)</th>
                      <th scope="col">Average Diameter(ft)</th>
                      <th scope="col">More Information</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.asteroids.map((asteroid) => {
                    return(
                        <tr class="table-dark">
                          <th scope="row">{asteroid.name}</th>
                          <td>{asteroid.ast_id}</td>
                          <td>{asteroid.next_appr_date}</td>
                          <td>{asteroid.distance_on_appr}</td>
                          <td>{asteroid.avg_estimated_diameter}</td>
                          <td><a href={asteroid.nerd_links}>More Info</a></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
    )
  }
}

export default App;

//
