import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [food, setFood] = useState('')
  const [aclass, setClass] = useState('')
  const [ID, setID] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState('')

  /// Функция получения всех параметров
  function startSearch(event) { 
    event.preventDefault()
    if (name.trim()) {
      var beastname = null;
      var beastvalue = null;
      
      beastname = name;
      beastvalue = value;

      let animanlsJSON = {
        name: beastname, 
        value: beastvalue,
      };

      console.log(animanlsJSON);

      fetch('/api/find', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            console.log(response);
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.error !== "Image not found")
              {
                console.log("RESULT:");
                console.log(result);

                setValue(result.value)
                setFood(result.food)
                setClass(result.class)
                setID(result.id)
                setImage('')
              }
              else
              setImage('Invalid record')
            });
    }
  }

  /// Функция получения картинки
  function sendReq(event) {
    event.preventDefault()
    if (name.trim()) {
      var beastname = null;
      var beastvalue = null;
      var imgfood = null;
      var imgclass = null;
      var imgID = null;
      
      beastname = name;
      beastvalue = value;
      imgfood = food;
      imgclass = aclass;
      imgID = ID;

      let beastsJSON = {
        name: beastname, 
        value: beastvalue,
        food: imgfood, 
				class: imgclass,
				ID: imgID
      };

      console.log("GET IMAGE:")
      console.log(beastsJSON)

      fetch('/api/beast', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(beastsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result);


              if (result.image != null)
              {
                setImage(result.image)
                setImg("img/" + result.image)
              }
              else
              {
                setImage('Image not found');
              }
            });
    }
  }

  return (
    <div className="wrapper">
      <label>
          <a>Название</a>
          <a style={{marginLeft: 115}}>Значение</a>
          <br></br>
          <input
            value={name} 
            onChange={event => setName(event.target.value)} 
          />

          <input 
            style={{marginLeft: 15}} 
            value={value} 
            onChange={event => setValue(event.target.value)} 
          /><p></p>

          <a>Способ питания</a>
          <a style={{marginLeft: 67}}>Класс</a>
          <br></br>
          <input 
            value={food} 
            onChange={event => setFood(event.target.value)} 
          ></input>
          <input 
            style={{marginLeft: 15}}
            value={aclass} 
            onChange={event => setClass(event.target.value)} 
          ></input><p></p>

          <a>ID</a>
          <a style = {{marginLeft: 170}}>Изображение</a>
          <br></br>
          <input
            value={ID} 
            onChange={event => setID(event.target.value)}             
          ></input> 
          <input style = {{marginLeft: 15}} 
            value={image} 
            onChange={event => setImage(event.target.value)}             
          ></input><p></p> 

          <input 
            type="submit" 
            value="Поиск" 
            onClick={sendReq}
          />

          <input style = {{marginLeft: 15}}
            type="submit" 
            value="Получить параметры" 
            onClick={startSearch}
          /><p></p>

        <img 
          src={img} 
          onChange={event => setImg(event.target.value)}
        />
      </label>
    </div>
  ); 

}

  


export default App;
