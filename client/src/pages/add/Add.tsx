import { gql, useMutation } from "@apollo/client";
import { BlobServiceClient } from "@azure/storage-blob";
import { Button, Card, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Add.css";



const CREATEGIG = gql`
  mutation CreateGig($input: GigInput) {
    createGig(input: $input) {
      id
      title
      shortTitle
      description
      shortDesc
      price
      coverImage
      images
      category
      deliveryTime
      revisionNumber
      features
      sales
      rating
      reviews
      token{
        token
      }
      createdAt
      updatedAt
    }
  }
`;

async function uploadBlob(filename: any, file: any) {
  const blobServiceClient = new BlobServiceClient(
    "https://bakaria.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-10T03:01:30Z&st=2023-05-30T19:01:30Z&spr=https,http&sig=ENvqgE9rh5rybi%2Fzf5IFE9Rf%2BF3Li6NSpmkTb58usa0%3D"
  );
  const containerClient = blobServiceClient.getContainerClient("images");
  const BlobClient = containerClient.getBlobClient(filename);
  const blockBlobClient = BlobClient.getBlockBlobClient();
  await blockBlobClient.uploadBrowserData(file, {
    blockSize: 4 * 1024 * 1024, // 4MB block size
    concurrency: 20, // 20 concurrency
    onProgress: (ev) => console.log(ev),
  });
  console.log("done");

}

export const Add = () => {

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["userJwtToken"]);

  const titleRef = React.useRef<HTMLInputElement>(null);
  const shortTitleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const shortDescRef = React.useRef<HTMLTextAreaElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const coverRef = React.useRef<HTMLInputElement>(null);
  const imagesRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLSelectElement>(null);
  const deliveryTimeRef = React.useRef<HTMLInputElement>(null);
  const revisionNumberRef = React.useRef<HTMLInputElement>(null);
  const featuresRef = React.useRef<HTMLInputElement>(null);

  const createGigHandler = async (e: any) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const shortTitle = shortTitleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const shortDesc = shortDescRef.current?.value || "";
    const price = parseFloat(priceRef.current?.value || "");
    const cover = coverRef.current?.value || "";
    const images = imagesRef.current?.value || "";
    const category = categoryRef.current?.value || "";
    const deliveryTime = parseFloat(deliveryTimeRef.current?.value || "");
    const revisionNumber = parseFloat(revisionNumberRef.current?.value || "");
    const features = featuresRef.current?.value || "";
    const freelancertoken = cookies.userJwtToken;
    const filename = cover.replace("C:\\fakepath\\", "");
    var imagesArray = images.split(",");
    var imageTable: { filename: string; mimetype: string; encoding: string; }[] = [];
    var imagelinks = []
    for (var i = 0; i < imagesArray.length; i++) {
      const filename = imagesArray[i].replace("C:\\fakepath\\", "");
      const mimeType = `image/jpeg`;
      const encoding = "7bit";
      const image = {
        filename: filename,
        mimetype: mimeType,
        encoding: encoding,
      };
      imageTable.push(image);

      imagelinks.push("https://bakaria.blob.core.windows.net/images/" + filename);
    }



    const gig = {
      title: title,
      shortTitle: shortTitle,
      description: description,
      shortDesc: shortDesc,
      price: price,
      coverImage: "https://bakaria.blob.core.windows.net/images/" + filename,
      images: imagelinks,
      category: category,
      deliveryTime: deliveryTime,
      revisionNumber: revisionNumber,
      features: features,
      token: {
        token: freelancertoken,
      },
    };

    await uploadBlob(filename, cover).then(() => {
      uploadBlob(imageTable[0].filename, imagesArray[0]).then(() => {
        createGig({ variables: { input: gig } });
      });
    });
  };

  const [createGig, { data, error }] = useMutation(CREATEGIG, {

    onError: (error) => {
      console.log(error);
    },

    onCompleted: (data) => {
      console.log(data);
      navigate("/");
    }
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if (cookies.userJwtToken === undefined) {
      navigate("/login");
    }
  }, [data, error]);

  return (
    <div style={{
      minWidth: "100vw",
    }}>
      <Card style={{
        width: "50%",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        borderRadius: "10px"
      }}>
        <h1>Create a new Gig</h1>
        <br />
        <br />
        <br />
        <form onSubmit={createGigHandler}>
          <FormControl>
            <FormLabel htmlFor="title" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Title</FormLabel>
            <Input type="text" id="title" ref={titleRef} required />
            <FormLabel htmlFor="shortTitle" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Short Title</FormLabel>
            <Input type="text" id="shortTitle" ref={shortTitleRef} required />
            <FormLabel htmlFor="description" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Description</FormLabel>
            <textarea id="description" ref={descriptionRef} style={{
              height: "100px",
              width: "100%",
            }} required />
            <FormLabel htmlFor="shortDesc" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Short Description</FormLabel>
            <textarea id="shortDesc" ref={shortDescRef} style={{
              height: "100px",
              width: "100%",
            }} required />
            <FormLabel htmlFor="price" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Price</FormLabel>
            <Input type="text" id="price" ref={priceRef} required />
            <FormLabel htmlFor="cover" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Cover</FormLabel>
            <Input type="file" id="cover" ref={coverRef} required />
            <FormLabel htmlFor="images" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Images</FormLabel>
            <Input type="file" id="images" ref={imagesRef} required />
            <FormLabel htmlFor="category" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Category</FormLabel>
            <select id="category" ref={categoryRef} style={{
              width: "100%",
              height: "40px",
              fontSize: "20px",
              textAlign: "center"
            }} required>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Writing & Translation">Writing & Translation</option>
              <option value="Video & Animation">Video & Animation</option>
              <option value="Music & Audio">Music & Audio</option>
              <option value="Programming & Tech">Programming & Tech</option>
              <option value="Data">Business</option>
            </select>
            <FormLabel htmlFor="deliveryTime" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Delivery Time (In days)</FormLabel>
            <Input type="text" id="deliveryTime" ref={deliveryTimeRef} required />
            <FormLabel htmlFor="revisionNumber" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Revision Number</FormLabel>
            <Input type="text" id="revisionNumber" ref={revisionNumberRef} required />
            <FormLabel htmlFor="features" style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}>Features</FormLabel>
            <Input type="text" id="features" ref={featuresRef} required />
            <br />
            <br />
            <Button style={{
              backgroundColor: "#1dbf73",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }} type="submit">Create Gig</Button>
          </FormControl>
        </form>
      </Card>
    </div>
  );
};
