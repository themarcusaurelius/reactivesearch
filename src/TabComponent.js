import React from "react";
import { SelectedFilters, SingleList } from "@appbaseio/reactivesearch";
import './index.css'

class TabComponent extends React.Component {
  handleChange = item => {
    const { setQuery, dataField } = this.props;
    if (item) {
      const query = SingleList.defaultQuery(item, {
        queryFormat: "or",
        dataField
      });
      setQuery({
        query,
        value: item
      });
    } else {
      setQuery(null);
    }
  };

  render() {
    const { dataField, aggregations } = this.props;
    let items = [];
    if (
      aggregations &&
      aggregations[dataField] &&
      aggregations[dataField].buckets.length
    ) {
      items = aggregations[dataField].buckets.map(
        ({ key: itemKey, doc_count }) => ({
          value: itemKey,
          count: doc_count
        })
      );
    }
    const selectedItem = items.find(item => item.value === this.props.value);
    return (
      <React.Fragment>
        <div className="tabContainer">
          {items.map(item => (
            <h4
              className={this.props.value === item.value ? "active" : ""}
              key={item.value}
              onClick={() => this.handleChange(item.value)}
            >
              {item.value}
            </h4>
          ))}
        </div>
        {selectedItem && (
          <p>
            <i>
              {selectedItem.count} {selectedItem.value} cars found
            </i>
          </p>
        )}

        <SelectedFilters onClear={() => this.handleChange(null)} />
      </React.Fragment>
    );
  }
}

export default TabComponent;