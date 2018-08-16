import React, { Component } from 'react'
import { Config } from "../config.js";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

export default class Job extends Component {
  static async getInitialProps(context) {
    const slug = context.query.slug;
    const jobRes = await fetch (`${Config.apiUrl}/wp-json/wp/v2/jobs?slug=${slug}`);
    const job = await jobRes.json();
    return {
      job
    }
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
      </div>
    )
  }
}
