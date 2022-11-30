import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Artist from "../../components/artist"
import {
  hero,
  section,
  subtitle,
  artists,
  description,
} from "../../page.module.css"
const ArtistsPage = ({
  data: {
    allWpArtist: { edges },
    wpPage: { artistFields },
  },
}) => {
  const image = getImage(artistFields.picture.localFile)
  return (
    <Layout pageTitle="Artists of Inghelbrecht Agency">
      <GatsbyImage
      className={hero} 
        image={image}
        alt={artistFields.picture.altText}
      />
      <section className={section}>
        <h2 className={subtitle}>{artistFields.title}</h2>
        <div
        className={description}
          dangerouslySetInnerHTML={{
            __html: artistFields.description,
          }}
        />
        <div className={artists}>
          {edges.map(({ node: artist }) => (
            <Artist key={artist.id} slug={artist.slug} artist={artist} />
          ))}
        </div>
      </section>
    </Layout>
  )
}
export const query = graphql`
query  {
  wpPage(slug: {eq: "artist"}) {
    id
    artistFields {
      description
      title
      picture {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, placeholder: BLURRED, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
  allWpArtist {
    edges {
      node {
        artistMeta {
          artistName
          firstName
          lastName
          profilePicture {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, transformOptions: {grayscale: true})
              }
            }
            altText
          }
        }
        slug
        id
      }
    }
  }
}`
export default ArtistsPage