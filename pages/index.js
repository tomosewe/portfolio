const contentful = require('contentful');
import React from 'react';

export default class extends React.Component {
    static async getInitialProps() {
        const client = contentful.createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: process.env.CONTENTFUL_TOKEN
        });

        const projects = [];

        await client.getEntries().then(function(entries) {
            entries.items.forEach(function(entry) {
                const project = {
                    title: entry.fields.title,
                    description: entry.fields.description,
                    link: entry.fields.link,
                    image: {
                        description: entry.fields.image.fields.description,
                        url: entry.fields.image.fields.file.url
                    }
                };
                projects.push(project);
            });
        });

        return {
            projects: projects
        };
    }

    render() {
        return (
            <div>
                <h1>Projects</h1>
                {this.props.projects.map(project => (
                    <div className="hori" key={project.title}>
                        <h2>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener"
                            >
                                {project.title}
                            </a>
                        </h2>
                        <img
                            src={project.image.url}
                            alt={project.image.description}
                        />
                    </div>
                ))}
                <style jsx>{`
                    .hori {
                        display: inline-block;
                    }
                    img {
                        width: 450px;
                    }
                `}</style>
            </div>
        );
    }
}
