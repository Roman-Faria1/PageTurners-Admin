import { Button, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../data/api_handlers";

const Books = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "isbn",
      headerName: "ISBN",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "Title",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "artist",
      headerName: "Artist",
      flex: 1,
    },
    {
      field: "illustrator",
      headerName: "Illustrator",
      flIx: 1,
    },
    {
      field: "genre",
      headerName: "Genre",
      flex: 1,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      flex: 1,
    },
    {
      field: "yearPublished",
      headerName: "Year Published",
      flex: 1,
    },
    {
      field: "booktype",
      headerName: "Book Type",
      flex: 1,
    },
  ];

  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/allbooks`);

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  async function handleBookClick(book) {
    // Navigate to the UserDetails page with the selected user's ID
    navigate(`/books/bookdetails/${book.isbn}`);
  }

  async function handleDelete() {
    // You can access the selected book ISBNs from the `selectedBooks` state
    console.log(
      "Selected Book ISBN's:",
      selectedBooks.map((book) => book.isbn)
    );
    try {
      for (const book of selectedBooks) {
        const response = await fetch(`${BASE_URL}/allbooks/${book.isbn}`, {
          method: "DELETE",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box m="20px">
      <Header title="Books" subtitle="List of all books" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={books}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            const selectedBooks = newSelection.map((id) =>
              books.find((book) => book.id === id)
            );
            console.log(books);
            setSelectedBooks(selectedBooks);
            console.log(selectedBooks);
          }}
          onRowClick={(params) => handleBookClick(params.row)}
        />
        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete Selected
        </Button>
      </Box>
    </Box>
  );
};

export default Books;
