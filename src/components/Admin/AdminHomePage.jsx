import { useNavigate } from "react-router-dom";
import "../../css/homadminpage.css";
import { PieChart, Pie } from "recharts";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const data = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];

  return (
    <>
      <div className="homeadminpage">
        <div className="homeadminpage-label">

          <div className="homeadminpage-label-1">
            {/* <img src="https://cdn-icons-png.flaticon.com/128/386/386605.png" alt="" /> */}
            <h2>Leave Request from faculties</h2>
          </div>

          <div className="homeadminpage-label-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1370/1370907.png"
              alt=""
            />
            {/* <img
              src="https://cdn-icons-png.flaticon.com/128/2838/2838779.png"
              alt=""
            /> */}
            {/* <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
              alt=""
            /> */}
          </div>

        </div>

        <div className="homeadminpage-content">
            <div className="homeadminpage-content-bars-faculty">
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Agriculture</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Allied Health Science</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Arts</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Dental Sciences</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Engineering</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Management</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Science</p>
              <p className="admin-card" onClick={() => navigate("/requestedForms")}>Faculty of Veterinary Medicine and Animal Science</p>
            </div>
          <div className="homeadminpage-content-statics-bar">
            <h3>Monthly Leave Statics</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
            </PieChart>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIMA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcBBAYCCAP/xAA+EAABAwEDCQMICgIDAAAAAAAAAQIDBAUHERIhMTU2cnSyswZBcRcyUlRzlKHRExYiQlFVkZPB0mGBQ5Lh/8QAGwEBAAMBAQEBAAAAAAAAAAAAAAQFBgIDAQf/xAAuEQEAAQIDBAkEAwAAAAAAAAAAAQIDBDI0ETFxsQUSEzNBUXKR0RQVIfBSU6H/2gAMAwEAAhEDEQA/ALxAAGnNQuklV7Zlbi/LwwxwzNTNnzL9nT/lcx4p7PfDKx6zoqN+6jFTDN3Z82OldOJvgAYRMO9TIAAAAAAAAAAAAARnaO2I7Bsee0pYXTMhViKxioirlORv8nyZ2fl1RRNdUU075SYK68rFH+U1P7jR5WKP8pqf3GnHaUeaZ9txf8OSxQRnZu2Y7fseG0ooXQslVyIx6oqpkuVv8EmdxO38oddE0VTTVvgAB9cgAAAAAAAAAAAADCuRMMVRMVwTEwj2Owwc1cccMF04aT8aqlZVfR5bnIjHI7Bq4Y4Lj/B+UNnRwyNkR71VMNOGfBME7s2b8AN0AwiYd6qBkAAAAAAAAAADlbz9iK/eh6rDqjlbz9iK/eh6rDmvLKTg9Tb9Uc1HgAgtuu667Yqi35uq46w5O67Yqi35uq46wnUZYYjG6m5xnmAA6RgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOVvP2Ir96HqsOqOVvP2Ir96HqsOa8spOD1Nv1RzUeACC267rrtiqLfm6riftvU1fw0nKpAXXbFUW/N1XE/bepq/hpOVSdbywxGN1NzjPN8psa3JT7KaPwM5LfRT9AzzU8D0WKvXFcKiJZ9sYJ/zx8qlqFV3C6vtj28fKpahDuZpetO4ABw6AAAAAAAAa9XDLKsSxSrHkuxVEXDH5+H+T8KekqI5WOfUOc1MPs5blwzYLp046c+juN8ADCJh3qpkAADRrrYs6z5khrayGGRW5SNe7BVTRj8FPkzEb3VFFVc7KY2y3gRP1msT8zpv+5mPtHY0sjI47Sp3Pe5Gtaj9KroQ57Sjzev0t/wDhPtKVAB28AAADlbz9iK/eh6rDqjlbz9iK/eh6rDmvLKTg9Tb9Uc1HgAgtuu667Yqi35uq4n7b1NX8NJyqQF12xVFvzdVxP23qav4aTlUnW8sMRjdTc4zzfKjPNTwPR5Z5qeB6LFXriuF1fbHt4+VS1Cq7hdX2x7ePlUtQh3M0vWncAA4dAAAAAAAAAPwqoZZkjSKb6PJejlzLnRF0aT8KejnjlY51Q5yJhimU5e7DvXPjpz/+gbwBhEw71UDJWd5mvoOEbzvLMKzvM19Bwjed5FxfdLjoLWRwlyRtWTrah4mLnQ1TasnW1DxMXOhWU74bK7kngu8A0rTtWhsmNklo1LYGSOyWq5Fzr/ovJnZvfm9NNVc9WmNst0EF9cez35pF+jvkPrj2e/NIf0d8j516fN7fSYj+ufaU6crefsRX70PVYdPDKyaJksTsqN7Uc134oug5i8/Yiv3oeqw+V5ZfcH+MTb9Uc1HgAhNuu667Yqi35uq4n7b1NX8NJyqQF12xVFvzdVxP23qav4aTlUnW8sMRjdTc4zzfKjPNTwPR5Z5qeB6LFXriuF1fbHt4+VS1Cq7hdX2x7ePlUtQh3M0vWncAA4dAAAAAAAAAAAAAAVneZr6DhG87yzCs7zNfQcI3neRcX3S46C1kcJckbVk62oeJi50NU2rJ1tQ8TFzoVlO+Gyu5J4LvODvb1bZ/ELyqd4cHe3q2z+IXlUuL3dywvRWso/fCVZGF0KZMLoUrm7X7YmpqDho+VCCvP2Ir96HqsJ2xNTUHDR8qEFefsRX70PVYWdWSeDAYfWU+qOajwAQm0XdddsVRb83VcT9t6mr+Gk5VIC67Yqi35uq4n7b1NX8NJyqTreWGIxupucZ5vlRnmp4Ho8s81PA9Fir1xXC6vtj28fKpahVdwur7Y9vHyqWoQ7maXrTuAAcOgAAAAAAAH4VUcsiRpE7JweiuXLVM3+tPguY16elqY5WOkmVzU+79I5cM2fTpx059Hcb4AGETDvVTIAFZ3ma+g4RvO8swrO8zX0HCN53kXF90uOgtZHCXJG1ZOtqHiYudDVNqydbUPExc6FZTvhsruSeC7zg729W2fxC8qneHB3t6ts/iF5VLi93csL0VrKP3wlWRhdCmTC6FK5u1+2Jqag4aPlQgrz9iK/eh6rCdsTU1Bw0fKhBXn7EV+9D1WFnVkngwGH1lPqjmo8AEJtF3XXbFUW/N1XE/bepq/hpOVSAuu2Kot+bquJ+29TV/DScqk63lhiMbqbnGeb5UZ5qeB6PLPNTwPRYq9cVwur7Y9vHyqWoVXcLq+2Pbx8qlqEO5ml607gAHDoAAAAAAAAANeSnc+qZMkmCN+7h46FxzY45/BANgA85K+m74Aeis7zNfQcI3neWVkr6bvgRVq9m7NtaobUV8T5JWsRiKkitzYqvd4qeN+3Nyjqwn9G4qjC3+0r27Nngp02rJ1tQ8TFzoWZ9R7B9Wl/ff8z3D2MsSCaOaOnkR8b0e1fpnrgqLineQowdyJ8Ggr6fwtVMxEVe0fLoDg729W2fxC8qndZK+m74EdbVhUNtxRxWkx8rInZTUR6twXDDuwLC5TNVMxDNYK/TYxFNyrdCiTC6FLh8n/Z31Wb3h/wAx5P8As76rN7w/5kT6atpvv+F8qvaPlOWJqag4aPlQgrz9iK/eh6rDpKenbTwRwROckcbUY1NOCImCH4WtZdLa9BJQ16Okp5cMpqOyccFRUzpn0ohMmNtOxl7V2mjEU3J3RO3/AF85Au3ycdmPU5vepP7DycdmPU5vepP7EfsKmh+9Ybyn2j5Zuu2Kot+bquJ+29TV/DScqmLJsqlsegjobPa6OnjVVa1XZWGKqq51z6VU2KinbUQSQSucscjVY5NGKKmCkmmNkRDOYi5Fy9XXG6ZmXyazzU8D0fQCXVdkETBKCf3yX+xnyV9kfUJ/fJf7EvtqUTqSgLhdX2x7ePlUtQhezvZeyuzUU8djxSQsncjpEdK5+KomCecq4Exkr6bvgR65iatsPSI2Q9A85K+m74Ho5fQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
