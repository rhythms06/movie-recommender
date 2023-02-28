'use client';

import React, {useState} from "react";
import Person from "./Person";

export default function SuggestAMovie() {
    type Person = {
        name: string;
        likes: string[];
    }
    const [people, setPeople] = useState<Person[]>([]);
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    function addPerson(person: Person) {
        setPeople([...people, { name: person.name, likes: []}]);
    }
    function generatePrompt() {
        if (people.filter(person => person.likes.length < 1).length > 0) {
            alert("Someone in your party has no likes.");
            return;
        }
        let prompt = "";
        people.forEach( person => {
            let movies = "";
            person.likes.forEach((movie, index) => {
                movies += "\"" + movie + "\"" + ( index != person.likes.length - 1 ? " and " : "" )
            })
            prompt += person.name + " loves the movies " + movies + ".\n\n"
        })
        prompt += "Can you recommend one movie "
        prompt += "that the " + people.length + " preceding " + (people.length == 1 ? "person" : "people") + " "
        prompt += "would enjoy? Please write your response according to these specifications:\n\n"
        prompt += "1. Write the name of the film, its release year, its Rotten Tomatoes critics score, "
        prompt += "and its Rotten Tomatoes page on the first line, e.g. MOVIE NAME (RELEASE YEAR, SCORE, LINK)\n\n"
        prompt += "2. Write a short paragraph explaining your recommendation after one blank line, "
        prompt += "from a third-person perspective. Refer to " + people.map(person => person.name).join(", ") + " "
        if (people.length > 2) {
            prompt += "with the collective pronoun \"all of you\"."
        } else if (people.length > 1) {
            prompt += "with collective pronouns like \"you two\" or \"both of you\"."
        } else {
            prompt += "with the pronoun \"you\"."
        }
        setPrompt(prompt);
    }
    return (
        <main className="w-full h-screen flex justify-center items-center">
            <div>
                <div className="flex flex-col justify-center text-center">
                    <em className="text-2xl">Who&apos;s Watching?!</em>
                    {people.length > 0 &&
                        <button className="text-gray-600" onClick={() => {setPeople([]);setPrompt("")}}>Reset</button>
                    }
                </div>
                <ul className="mt-8 flex flex-col gap-2 items-center">
                    {people.map((person, index) => (
                        <li key={index}>
                            <Person person={person}/>
                        </li>
                    ))}
                </ul>
                <form className="mt-5 flex justify-center" onSubmit={event => {event.preventDefault(); name && addPerson({name: name, likes: []}); setName("")}}>
                    <label className="flex gap-2 items-center">
                        <span>Add</span>
                        <input className="p-2 w-36 rounded-md" type="text" placeholder="Sakib"
                               value={name} onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                </form>
                <button className="mt-5 w-full text-gray-600 disabled:cursor-not-allowed" disabled={people.length < 1} onClick={() => generatePrompt()}>
                    Generate Prompt<span><em>!</em></span>
                </button>
                <div className="m-5 max-w-prose">
                    { prompt }
                </div>
            </div>
        </main>
    )
}