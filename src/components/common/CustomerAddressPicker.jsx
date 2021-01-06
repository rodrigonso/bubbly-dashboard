import React from "react";
import { Select } from "antd";
import { useState } from "react";
import Axios from "axios";
import Address from "../../models/Address";

export default function UserAddressPicker(props) {
  const [newAddress, setNewAddress] = useState({});

  const handleSelection = (item) => {
    if (!item) {
      props.onChange(newAddress);
    }

    const address = props.user.addresses.filter((el) => el.id === item)[0];
    props.onChange(address);
  };

  const handleNewAddressSearch = async (query) => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API);
    try {
      let { data } = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
      );
      if (data.results.length > 0) {
        const { results } = data;
        const address = {
          id: "1",
          icon: "home",
          city: results[0].address_components[2].long_name,
          street: `${results[0].address_components[0].long_name} ${results[0].address_components[1].long_name}`,
          state: results[0].address_components[4].short_name,
          zipCode: results[0].address_components[6].long_name,
          coords: {
            latitude: results[0].geometry.location.lat,
            longitude: results[0].geometry.location.lng,
          },
        };
        setNewAddress(new Address(address.id, address));
        handleSelection(new Address(address.id, address));
        console.log(address);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Select
        showSearch
        disabled={props.user === null}
        onSearch={(val) => handleNewAddressSearch(val)}
        onChange={handleSelection}
      >
        {props.user
          ? [
              ...props.user.addresses,
              newAddress.street ? newAddress : [],
            ].map((item) => (
              <Select.Option key={item.id}>{item.toString()}</Select.Option>
            ))
          : null}
      </Select>
    </>
  );
}
