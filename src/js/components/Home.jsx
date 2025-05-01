import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("")
	const [ todos, setTodos] = useState([]);

	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input 
						type="text" 
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat(inputValue)); 
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?"></input>
					</li>
					{todos.map((t) => (
						<li>
						{t}
						</li>
					))}
			</ul>
			<div> {todos.length} tasks</div>
		</div>
	);
};

export default Home;