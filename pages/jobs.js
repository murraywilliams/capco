import React, { Component } from 'react'
import { Config } from "../config.js";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import WPAPI from 'wpapi';

export default class Job extends Component {
  static async getInitialProps(context) {
    this.wp = new WPAPI({
      endpoint: Config.apiUrl + /wp-json/,
      username: Config.username,
      password: Config.password});

    this.wp.jobs = this.wp.registerRoute( 'wp/v2', '/jobs/' );
    const slug = context.query.slug;
    const jobRes = await fetch (`${Config.apiUrl}/wp-json/wp/v2/jobs?slug=${slug}`);
    const job = await jobRes.json();
    return {
      job
    }
  }
  handlePost = () => {
    console.log(this.wp.jobs)
    this.wp.jobs().create({
      job_title: 'New Job Pls',
      status: 'published'
    })
    .then(function( res ) {
      console.log(res.id)
      console.log('Job Posted!')
    })
  }
  render() {
    const  job = this.props.job[0]
    return (
      <div>
        <Link href={`/`} >
            <a>Take me home</a>
        </Link>
        <h1>{job.acf.job_title}</h1>
        <p><strong>Location:</strong> {job.acf.location}</p>
        <p><strong>Hours per week:</strong> {job.acf.hours_per_week}</p>
        <div
            dangerouslySetInnerHTML={{
                __html: job.acf.job_description
            }}
        />
        <button onClick={this.handlePost}>Post</button>
      </div>
    )
  }
}
