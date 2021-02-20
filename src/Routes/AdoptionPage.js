import React from 'react';
import Pets from '../Components/Pets/Pets';
import People from '../Components/People/People';
import Config from '../config'
export default class AdoptionPage extends React.Component {
    state = {
      dog: {},
      cat: {},
      people: [],
      name: "",
      enableSubmit: true,
      type: "",
  
    };
    componentDidMount() {
      return this.handleGetPets();
    }
  
    get showAdopt() {
      if (this.state.people[0] === this.state.name) {
        return true;
      } else {
        return false;
      }
    }
  
    handleGetPets = () => {
      return Promise.all([
        fetch(`${Config.REACT_APP_API_BASE}pets`),
        fetch(`${Config.REACT_APP_API_BASE}people`),
      ])
        .then(([petRes, peopleRes]) => {
          if (!petRes.ok) return petRes.json().then((e) => Promise.reject(e));
          if (!peopleRes.ok)
            return peopleRes.json().then((e) => Promise.reject(e));
          return Promise.all([petRes.json(), peopleRes.json()]);
        })
        .then(([petRes, peopleRes]) => {
            this.setState({
              dog: petRes[1] ? petRes[1].dog:null,
              cat: petRes[0] ? petRes[0].cat:null,
              people: peopleRes ? peopleRes : [],
            })
        })
        .catch((error) => console.log({ error }));
    };
    setName = (e) => {
      this.setState({ name: e.target.value });
    };
  
    submitName = () => {
      fetch(`${Config.REACT_APP_API_BASE}people`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person: this.state.name }),
      })
        .then(() => {
          this.handleGetPets().then(() => {
            if (this.showAdopt) {
              this.addPeopleSim();
            } else {
              this.adoptSim();
            }
          });
        })
        .catch((error) => console.log(error));
  
      this.setState({ enableSubmit: false });
    };

    adoptSim = () => {
      setTimeout(() => {
        let deciding = Math.floor(Math.random() * 2)
        let type;
        if(deciding === 0){
          type = 'cat'
        } else if(deciding===1){
          type = 'dog'
        }
        this.adopt(type).then(() => {
          if (this.showAdopt) {
            this.addPeopleSim();
          } else {
            this.adoptSim();
          }
        });
      }, 2000);
    };
    addPeopleSim = (i = 0) => {
      let peopleSims = ["Shlomo Izakson", "Yuval Makhlouf", "Svitlana Karpenko", "Rania el-Masry", "Tamar Goldstein"];
  
      setTimeout(() => {
        fetch(`${Config.REACT_APP_API_BASE}people`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ person: peopleSims[i] }),
        });
        let newPeople = this.state.people;
        newPeople.push(peopleSims[i]);
        this.setState({
          people: newPeople,
        });
        i++;
        if (this.state.people.length < 5) {
          this.addPeopleSim(i);
        }
      }, 1000);
    };
  
    adopt = async (type) => {
      await this.deletePet(type);
      await this.handleGetPets();
    };

    deletePet = (type) => {
      return fetch(`${Config.REACT_APP_API_BASE}pets`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: type }),
      })
    };

    adoptAnimal = (type) => {
      if (type === "all") {
        this.adopt(type);
        alert("You have adopted a cat and dog");
      } else {
        this.adopt(type);
        alert(`You have adopted a ${type}`);
      }
      this.setState({
        enableSubmit: true
      })
    };
  
    render() {
      
      return (
        <div>
          <Pets
            cat={this.state.cat}
            dog={this.state.dog}
            showAdopt={this.showAdopt}
            adoptAnimal={this.adoptAnimal}
          />
          <People
            people={this.state.people}
            name={this.state.name}
            setName={this.setName}
            submitName={this.submitName}
            enableSubmit={this.state.enableSubmit}
          />
        </div>
      );
    }
  }