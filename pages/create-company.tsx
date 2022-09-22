import { useState } from 'react'
import { API, Storage } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

import { createCompany } from '../src/graphql/mutations'
import config from '../src/aws-exports'

function CreateCompany () {
  const [name, setName] = useState('')
  const [image, setImage] = useState({name: ''})
  console.log(image.name);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // upload the image to S3
    const uploadedImage = await Storage.put(image.name, image)
    console.log(uploadedImage)
    // submit the GraphQL query 
    const newCompany = await API.graphql({
      query: createCompany,
      variables: {
        input: {
          name,
          image: {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key
          }
        }
      }
    })
    console.log(newCompany)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Company</h2>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' onChange={e => setName(e.target.value)} />
      <label htmlFor='image'>Image</label>
      <input type='file' id='image' onChange={e => setImage(!e.target.files? {name: ''} : e.target.files[0])} />
      <input type='submit' value='create' />
    </form>
  )
}

export default withAuthenticator(CreateCompany)