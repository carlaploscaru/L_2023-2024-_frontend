import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "./PropertyList.module.css";
import { useEffect, useState } from "react";
import { getAuthToken } from "../utils/auth";
import Rating from "react-rating";
import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";

const PropertyList = ({ properties }) => {
  const token = getAuthToken();
  const [categories, setCategories] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ds, getDateStart] = useState();
  const [de, setDateEnd] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  
  const pageNumberArray = [];
  let j=0;
  console.log("totalllllllllllllllllllllllllll",properties.totalItems)
  for (let i = 0; i <= properties.totalItems; i++) {
    if (i % itemsPerPage === 0) {
      j = j + 1;
      pageNumberArray.push(j);
    }
  }

  useEffect(() => {

    const getCategories = async () => {
      const response = await fetch("http://localhost:8000/category", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw json({ message: "Could not fetch properties" }, { status: 500 });
      } else {
        const resData = await response.json();

        setCategories(resData.categories);
      }
    };

    getCategories();
  }, [fetch]);



  const data_start = searchParams.get("data_start");
  const data_end = searchParams.get("data_end");
  const tara = searchParams.get("tara");
  const oras = searchParams.get("oras");
  const category = searchParams.get("category");


  const dataStartChangeHandler = (event) => {
    if (data_start && (new Date(event.target.value)).getTime() > (new Date(data_end)).getTime()) {
      setSearchParams({ page: pageNumber, data_start: "", data_end: data_end ? data_end : "", tara: tara ? tara : "", oras: oras ? oras : "", category: category ? category : "" })
    } else {
      setSearchParams({ page: pageNumber,data_start: event.target.value, data_end: data_end ? data_end : "", tara: tara ? tara : "", oras: oras ? oras : "", category: category ? category : "" })
    }
  }


  const dataEndChangeHandler = (event) => {
    if ((new Date(event.target.value)).getTime() < (new Date(data_start)).getTime()) {
      setSearchParams({page: pageNumber, data_start: data_start ? data_start : "", data_end: "", tara: tara ? tara : "", oras: oras ? oras : "", category: category ? category : "" })
    } else {
      setSearchParams({ page: pageNumber,data_start: data_start ? data_start : "", data_end: event.target.value, tara: tara ? tara : "", oras: oras ? oras : "", category: category ? category : "" })
    }
  }


  const nextPageClickHandler = (event) => {
    event.preventDefault()//sa nu schimbe pozitia paginii
    let incPage = pageNumber;
    incPage++;
    if (incPage > Math.ceil(properties.totalItems / itemsPerPage)) {
      setPageNumber(Math.ceil(properties.totalItems / itemsPerPage))
    } else {
      setPageNumber(incPage)
    }

  }

  const previousPageClickHandler = (event) => {
    event.preventDefault()
    let decrementPage = pageNumber;
    decrementPage--;
    if (decrementPage < 1) {
      setPageNumber(1);
    } else {
      setPageNumber(decrementPage)
    }

  }

  const PageClickHandler = (pageNumber,event) => {
    event.preventDefault();
    setPageNumber(pageNumber)
  }

  console.log(pageNumber)
  return (
    <div className={classes.propertiesPage}>
      <div className={classes.propertiesForm}>
        <Form className={classes.form}>
          <p>
            <label htmlFor="tara">Country</label>
            <input id="tara" type="text" name="tara" />
          </p>

          <p>
            <label htmlFor="oras">City</label>
            <input id="oras" type="text" name="oras" />
          </p>

          <p>
            <label htmlFor="categorie">Category</label>
            <select name="category" id="category">
              <option value=""></option>
              {categories &&
                categories.map((category) => {
                  return <option value={category._id}>{category.title}</option>;
                })}
            </select>
          </p>

          <p>
            <label htmlFor="data_start">Data start</label>
            <input id="data_start" type="date" name="data_start" style={{ borderColor: data_start && data_start !== "" ? "green" : "red" }}
              onChange={dataStartChangeHandler}
              value={data_start} />
          </p>
          <p>
            <label htmlFor="data_end">Data end</label>
            <input id="data_end" type="date" name="data_end" style={{ borderColor: data_end && data_end !== "" ? "green" : "red" }}
              onChange={dataEndChangeHandler}
              value={data_end} />
          </p>
          <div className={classes.actions}>

            <button style={{ backgroundColor: "red" }}>
              {"Search"}
            </button>
          </div>
        </Form>
      </div>
      <div className={classes.properties}>
        <h1>All Properties</h1>
        <ul className={classes.list}>
          {properties.places.map((property) => (
            <li key={property.id} className={classes.item}>

              {data_start &&
                data_start !== "" &&
                data_end &&
                data_end !== "" &&
                <Link to={`/properties/${property._id}`}>
                  <img
                    src={`http://localhost:8000/${property.image[0]}`}
                    alt={property.title}
                  ></img>
                  <div style={{ color: 'white' }} className={classes.content}>
                    <h2 >Category  {property.category}  {property.title}</h2>
                    <p>Country:  {property.tara}, City:  {property.oras},Street:  {property.strada}, Surface:  {property.suprafata}</p>{/* <time>{property.oras}</time> */}
                    <p>Owner:  {property.owner}</p>
                    <h2 >Price:  {property.price}  {property.currency}</h2>
                    <Rating
                      placeholderRating={property.rating}
                      emptySymbol={
                        <img src={starGrey} className="icon" style={{ width: '20px', height: '20px' }} />
                      }
                      placeholderSymbol={
                        <img src={starRed} className="icon" style={{ width: '20px', height: '20px' }} />
                      }
                      fullSymbol={
                        <img src={starGold} className="icon" style={{ width: '20px', height: '20px' }} />
                      }
                      readonly={true}
                    />
                  </div>
                </Link>}
              {
                <>
                  <img
                    src={`http://localhost:8000/${property.image[0]}`}
                    alt={property.title}
                  ></img>
                  <div style={{ color: 'white' }} className={classes.content}>
                    <h2 >Category  {property.category}  {property.title}</h2>
                    <p>Country:  {property.tara}, City:  {property.oras},Street:  {property.strada}, Surface:  {property.suprafata}</p>{/* <time>{property.oras}</time> */}
                    <h2 >Price:  {property.price}  {property.currency}</h2>
                    <p >Owner:  {property.owner}  </p>
                    <Rating
                      placeholderRating={property.rating}
                      emptySymbol={
                        <img src={starGrey} className="icon" style={{ width: '20px', height: '20px'}} />
                      }
                      placeholderSymbol={
                        <img src={starRed} className="icon" style={{ width: '20px', height: '20px' }} />
                      }
                      fullSymbol={
                        <img src={starGold} className="icon" style={{ width: '20px', height: '20px' }} />
                      }
                      readonly={true}
                    />
                  </div>
                </>
              }
            </li>
          ))}
        </ul>

        <ul style={{ listStyle: "none", display: "flex", justifyContent: "end" }}>
          <li style={{ padding: "10px", backgroundColor: "grey", margin: "1px", borderRadius: "2px" }}>
            <a href="#" style={{ textDecoration: "none" }} onClick={previousPageClickHandler}>{"<"}</a>
          </li>
         { pageNumberArray.map(pgNumber => <li style={{ padding: "10px", backgroundColor: +pgNumber===+pageNumber ? "green" : "red", margin: "1px", borderRadius: "2px" }}>
            <a href="#" onClick={() => PageClickHandler(pgNumber)}>{pgNumber}</a>
          </li>)}
          <li style={{ padding: "10px", backgroundColor: "grey", margin: "1px", borderRadius: "2px" }}>
            <a href="#" style={{ textDecoration: "none" }} onClick={nextPageClickHandler}>{">"}</a>
          </li>
        </ul>


      </div>
    </div>
  );
};

export default PropertyList;