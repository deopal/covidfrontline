import axios from "axios";
import React from "react";
import Sidebar from "../../../AdminComponents/sidebar";
import SimpleReactValidator from "simple-react-validator";
import { isAutheticated, signout } from "../../../auth";
import Loader from "react-loader-spinner";
class AddServiceprovider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            name: "",
            icu: "",
            general: "",
            single_room: "",
            sharing: "",
            icu_tier2: "",
            pulmonology: "",
            pulmonology_timing: "",
            cardiology: "",
            cardiology_timing: "",
            gastroenterology: "",
            gastroenterology_timing: "",
            canteen: "",
            lounge: "",
            pharmacy: "",
            radiology: "",
            pathology: "",
            haemotology: "",
            ambulance: "",
            admin: "",
            service_provider: "",
            loading: true

        };
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const {
            user: { _id },
        } = isAutheticated();
        this.setState({ admin: _id });

        const { id } = this.props.match.params;
        this.setState({ service_provider: id });
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/serviceprovider/get/${id}`)
            .then((res) => {
                const menu = res.data.data;
                console.log(menu);
                const product_type = menu.product.split(",");
                let found = product_type.find(name => name === "hospital");
                if (found)
                    this.setState({ name: menu.party_name, loading: false });
                else {
                    alert("No hospitals");
                    this.props.history.push("/serviceprovider");
                }
            })
            .catch(err => {
                console.log(err);
                alert("somthing went wrong");
            });

        axios.get(`${process.env.REACT_APP_BASE_URL}/hospital/get/${id}`)
            .then((res) => {
                const status = res.data.success;
                if (status) {
                    const menu = res.data.data[0];
                    console.log(menu);
                    this.setState({
                        name: menu.name,
                        icu: menu.accomodation.icu_bed,
                        general: menu.accomodation.general_ward,
                        single_room: menu.accomodation.single_room,
                        sharing: menu.accomodation.sharing_room,
                        icu_tier2: menu.accomodation.icu_tier2,
                        pulmonology: menu.specialities.pulmonology.status ? "true" :"",
                        pulmonology_timing: menu.specialities.pulmonology.timing,
                        cardiology:  menu.specialities.cardiology.status ? "true" :"",
                        cardiology_timing: menu.specialities.cardiology.timing,
                        gastroenterology: menu.specialities.gastroenterology.status ? "true" :"",
                        gastroenterology_timing: menu.specialities.gastroenterology.timing,
                        canteen: menu.amenities.canteen ? "true" :"",
                        lounge: menu.amenities.lounge ? "true" :"",
                        pharmacy: menu.amenities.pharmacy ? "true" :"",
                        radiology: menu.amenities.radiology ? "true" :"",
                        pathology: menu.amenities.pathology ? "true" :"",
                        haemotology: menu.amenities.haemotology ? "true" :"",
                        ambulance: menu.ambulance ,
                        admin: menu.admin,
                        service_provider: menu.service_provider,
                    });
                }

            })
            .catch(err => {
                console.log(err);
                alert("somthing went wrong");
            });


        // axios.get(`${process.env.REACT_APP_BASE_URL}/admin/update_adminusers/${_id}`).then((res) => {
        //   const user = res.data;
        //   console.log(user);
        //   this.setState({ user, loading: true });
        // });

    }




    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ loading: true });
        const menu = {
            admin: this.state.admin,
            service_provider: this.state.service_provider,
            name: this.state.name,
            accomodation: {
                icu_bed: this.state.icu,
                general_ward: this.state.general,
                sharing_room: this.state.sharing,
                single_room: this.state.single_room,
                icu_tier2: this.state.icu_tier2
            },
            specialities: {
                pulmonology: {
                    status: this.state.pulmonology ? true : false,
                    timing: this.state.pulmonology_timing
                },
                cardiology: {
                    status: this.state.cardiology ? true : false,
                    timing: this.state.cardiology_timing
                },
                gastroenterology: {
                    status: this.state.gastroenterology ? true : false,
                    timing: this.state.gastroenterology_timing
                }
            },
            amenities: {
                canteen: this.state.canteen ? true : false,
                lounge: this.state.lounge ? true : false,
                pharmacy: this.state.pharmacy ? true : false,
                radiology: this.state.radiology ? true : false,
                pathology: this.state.pathology ? true : false,
                haeomotology: this.state.haeomotology ? true : false
            },
            ambulance: this.state.ambulance,

        };
        console.log(menu);
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/hospital/add`, menu)
            .then((res) => {
                this.setState({ loading: false });
                console.log(res.data);
                this.props.history.push("/serviceprovider");
            })
            .catch(err => {
                console.log(err);
                alert("something went wrong");
            });


    }



    render() {
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Hospital Catalog</div>
                        {!this.state.loading ? (
                            <div className="admin-data">
                                <div className="container-fluid p-0">
                                    <form
                                        className="form-contact contact_form"
                                        onSubmit={this.handleSubmit}
                                    >
                                        <div className="row m-0">
                                            <div className="col-lg-12 p-0"></div>
                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field row m-0">
                                                    <label className="col-lg-2 p-0 m-auto"> Name of hospital</label>
                                                    <input
                                                        disabled
                                                        className="form-control col-lg-10"
                                                        name="name"
                                                        onChange={this.handleChange}
                                                        value={this.state.name}
                                                        type="text"
                                                        onfocus="this.placeholder = 'Menu Name'"
                                                        onblur="this.placeholder = ''"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field row m-0">
                                                    <label className="col-lg-2 p-0 m-auto">Accomodation</label>
                                                    <div className="form-control col-lg-10 h-100">
                                                        <div className="row m-auto p-2">
                                                            <label for="icu" className="col-lg-4 col-sm-4 col-md-4">ICU bed</label>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="icu"
                                                                id="icu"
                                                                onChange={this.handleChange}
                                                                value={this.state.icu}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="capicity"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2">
                                                            <label for="general" className="col-lg-4 col-sm-4 col-md-4">General ward</label>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="general"
                                                                id="general"
                                                                onChange={this.handleChange}
                                                                value={this.state.general}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="capicity"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2 ">
                                                            <label for="sharing" className="col-lg-4 col-sm-4 col-md-4">Sharing room</label>
                                                            <input

                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="sharing"
                                                                id="sharing"
                                                                onChange={this.handleChange}
                                                                value={this.state.sharing}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="capicity"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2">
                                                            <label for="single_room" className="col-lg-4 col-sm-4 col-md-4">Single room</label>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="single_room"
                                                                id="single_room"
                                                                onChange={this.handleChange}
                                                                value={this.state.single_room}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="capicity"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2">
                                                            <label for="icu_tier2" className="col-lg-4 col-sm-4 col-md-4">Tier-2 ICU</label>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="icu_tier2"
                                                                id="icu_tier2"
                                                                onChange={this.handleChange}
                                                                value={this.state.icu_tier2}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="capicity"
                                                            />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field row m-0">
                                                    <label className="col-lg-2 p-0 m-auto">specialities</label>
                                                    <div className="form-control col-lg-10 h-100">
                                                        <div className="row m-auto p-2">
                                                            <div className="col-lg-4 col-sm-4 col-md-4 row" >
                                                                <input
                                                                    className="mr-2"
                                                                    type="checkbox"
                                                                    name="pulmonology"
                                                                    id="pulmonology"
                                                                    onChange={this.handleChange}
                                                                    value="true"
                                                                    onfocus="this.placeholder = 'Menu '"
                                                                    onblur="this.placeholder = ''"
                                                                    checked={this.state.pulmonology ? "checked" :""}
                                                                />
                                                                <label for="pulmonology">Pulmonology</label>
                                                            </div>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="pulmonology_timing"
                                                                id="pulmonology_timing"
                                                                onChange={this.handleChange}
                                                                value={this.state.pulmonology_timing}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="Timing"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2">
                                                            <div className="col-lg-4 col-sm-4 col-md-4 row" >
                                                                <input
                                                                    className="mr-2"
                                                                    type="checkbox"
                                                                    name="cardiology"
                                                                    id="cardiology"
                                                                    onChange={this.handleChange}
                                                                    value="true"
                                                                    onfocus="this.placeholder = 'Menu '"
                                                                    onblur="this.placeholder = ''"
                                                                    checked={this.state.cardiology ? "checked" :""}
                                                                />
                                                                <label for="cardiology">Cardiology</label>
                                                            </div>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="cardiology_timing"
                                                                id="cardiology_timing"
                                                                onChange={this.handleChange}
                                                                value={this.state.cardiology_timing}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="Timing"
                                                            />
                                                        </div>
                                                        <div className="row m-auto p-2">
                                                            <div className="col-lg-4 col-sm-4 col-md-4 row" >
                                                                <input
                                                                    className="mr-2"
                                                                    type="checkbox"
                                                                    name="gastroenterology"
                                                                    id="gastroenterology"
                                                                    onChange={this.handleChange}
                                                                    value="true"
                                                                    onfocus="this.placeholder = 'Menu '"
                                                                    onblur="this.placeholder = ''"
                                                                    checked={this.state.gastroenterology ? "checked" :""}

                                                                />
                                                                <label for="gastroenterology">Gastroenterology</label>
                                                            </div>
                                                            <input
                                                                className="form-control col-lg-8 col-md-8 col-sm-8"
                                                                type="text"
                                                                name="gastroenterology_timing"
                                                                id="gastroenterology_timing"
                                                                onChange={this.handleChange}
                                                                value={this.state.gastroenterology_timing}
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                placeholder="Timing"
                                                            />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>



                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field row m-0">
                                                    <label className="col-lg-2 p-0 m-auto">Hospital Amenities</label>
                                                    <div className="form-control col-lg-10 h-100">
                                                        <div className="row m-auto">

                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="canteen"
                                                                id="canteen"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.canteen ? "checked" :""}
                                                            />
                                                            <label for="canteen">Canteen</label>
                                                        </div>
                                                        <div className="row m-auto">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="lounge"
                                                                id="lounge"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.lounge ? "checked" :""}
                                                            />
                                                            <label for="lounge">Lounge</label>
                                                        </div>
                                                        <div className="row m-auto ml-2">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="pharmacy"
                                                                id="pharmacy"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.pharmacy ? "checked" :""}

                                                            />
                                                            <label for="pharmacy">Pharmacy</label>
                                                        </div>
                                                        <div className="row m-auto">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="radiology"
                                                                id="radiology"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.radiology ? "checked" :""}

                                                            />
                                                            <label for="radiology">Radiology</label>
                                                        </div>
                                                        <div className="row m-auto">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="pathology"
                                                                id="pathology"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.pathology ? "checked" :""}

                                                            />
                                                            <label for="pathology">Pathology</label>
                                                        </div>
                                                        <div className="row m-auto">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                name="haeomotology"
                                                                id="haeomotology"
                                                                onChange={this.handleChange}
                                                                value="true"
                                                                onfocus="this.placeholder = 'Menu '"
                                                                onblur="this.placeholder = ''"
                                                                checked={this.state.haeomotology ? "checked" :""}

                                                            />
                                                            <label for="haeomotology">Haeomotology</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>



                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field row m-0">
                                                    <label className="col-lg-2 p-0 m-auto">No. of ambulance</label>
                                                    <input
                                                        className="form-control col-lg-10"
                                                        name="ambulance"
                                                        onChange={this.handleChange}
                                                        value={this.state.ambulance}
                                                        type="text"
                                                        onfocus="this.placeholder = 'Menu ambulance'"
                                                        onblur="this.placeholder = ''"
                                                        placeholder="No. of ambulance"
                                                    />

                                                </div>
                                            </div>


                                            <div className="col-lg-12 p-0">
                                                <div className="form-group tags-field  row m-0">
                                                    <label className="col-lg-2 p-0" />
                                                    <div className="col-lg-6 p-0">
                                                        <button
                                                            className="button button-contactForm boxed-btn"
                                                            type="submit"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>) : (
                            <div style={{ marginLeft: "500px", marginTop: "200px" }}>
                                {" "}
                                <Loader
                                    type="Circles"
                                    color="#f39510"
                                    height={100}
                                    width={100}
                                    timeout={3000} //3 secs
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddServiceprovider;
