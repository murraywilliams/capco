import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

const headerImageStyle = {
    marginTop: 50,
    marginBottom: 50
};

class Index extends Component {
    static async getInitialProps(context) {
        const pageRes = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/page?slug=welcome`
        );
        const page = await pageRes.json();
        const jobsRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/jobs?_embed`
        );
        const jobs = await jobsRes.json();
        const pagesRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`
        );
        const pages = await pagesRes.json();
        return { page, jobs, pages };
    }

    render() {
        console.log(`This is the username ${Config.username}`)
        const jobs = this.props.jobs.map((job, index) => {
            return (
                <ul key={index}>
                    <li>
                    <Link prefetch
                        as={`/jobs/${job.slug}`}
                        href={`/jobs?slug=${job.slug}&apiRoute=jobs`}
                    >
                        <a>{job.title.rendered}</a>
                    </Link>
                    </li>
                </ul>
            )
        });
        const pages = this.props.pages.map((page, index) => {
            return (
                <ul key={index}>
                    <li>
                        <Link
                            as={`/page/${page.slug}`}
                            href={`/post?slug=${page.slug}&apiRoute=page`}
                        >
                            <a>{page.title.rendered}</a>
                        </Link>
                    </li>
                </ul>
            );
        });
        return (
            <Layout>
                <h2>LATEST JOBS</h2>
                {jobs}

            </Layout>
        );
    }
}

export default PageWrapper(Index);
