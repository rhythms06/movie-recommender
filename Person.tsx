'use client';

import React, {useState} from "react";

type Person = {
    name: string;
    likes: string[];
}

export default function Person({ person } : { person: Person }) {
    const [movie, setMovie] = useState("");
    return (
        <form onSubmit={event => {event.preventDefault(); person.likes.push(movie); setMovie("")}}>
            <span className="font-bold">{ person.name } </span>
            likes
            <span> { person.likes.join(" and ") } </span>
            <span> { person.likes.length > 0 && " and " }</span>
            <input className="mr-0.5 py-1 px-2 w-24 rounded-sm" type="text" placeholder="Joker"
                   value={movie} onChange={event => setMovie(event.target.value)}
            />
            .
        </form>
    )
}