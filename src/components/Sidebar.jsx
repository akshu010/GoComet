/* eslint-disable react/prop-types */
const Sidebar = ({ onFilterChange }) => {
  return (
    <div>
      <div className="p-4 border-r border-t mt-[105px] w-44">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-4 border-t">
          <h3 className="font-medium">PRICE RANGE</h3>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("priceRanges", "upto1000", e.target.checked)
                }
              />{" "}
              Up to ₹1000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("priceRanges", "1001to2000", e.target.checked)
                }
              />{" "}
              ₹1001 to ₹2000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("priceRanges", "2001to5000", e.target.checked)
                }
              />{" "}
              ₹2001 to ₹5000
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("priceRanges", "above5000", e.target.checked)
                }
              />{" "}
              Above ₹5000
            </label>
          </div>
        </div>

        <div className="mb-4 border-t">
          <h3 className="font-medium">RATING</h3>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("ratings", "0-1", e.target.checked)
                }
              />{" "}
              0 - 1 Star
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("ratings", "1-2", e.target.checked)
                }
              />{" "}
              1 - 2 Star
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("ratings", "2-3", e.target.checked)
                }
              />{" "}
              2 - 3 Star
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("ratings", "3-4", e.target.checked)
                }
              />{" "}
              3 - 4 Star
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("ratings", "4-5", e.target.checked)
                }
              />{" "}
              4 - 5 Star
            </label>
          </div>
        </div>

        <div className="border-t">
          <h3 className="font-medium">CITY</h3>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("cities", "mumbai", e.target.checked)
                }
              />{" "}
              Mumbai
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("cities", "kolkata", e.target.checked)
                }
              />{" "}
              Kolkata
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("cities", "bengaluru", e.target.checked)
                }
              />{" "}
              Bengaluru
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  onFilterChange("cities", "jaipur", e.target.checked)
                }
              />{" "}
              Jaipur
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
