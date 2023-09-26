<template>
    <div class="container-fluid">
        <div class="row adminPanel">
            <div class="col-2">
                <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                    <nav class="nav nav-pills flex-column">
                        <a class="nav-link" href="#products">Products</a>
                        <a class="nav-link" href="#users">Users</a>
                        <a class="nav-link" href="#orders">Orders</a>
                    </nav>
                </nav>
            </div>

            <div class="col-10">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
                    class="scrollspy-example-2" tabindex="0">
                    <div id="products">
                        <h4>Products</h4>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th class="col-1">Stock</th>
                                    <th class="col d-flex justify-content-center">
                                        <button class="btn btn-success align-items-end" data-bs-toggle="modal"
                                            data-bs-target="#newProductModal">New Product</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="productList" class="table-group-divider">
                                <!-- <tr class="align-middle">
                            <th scope="row">ProductTest10</th>
                            <td>10</td>
                            <td class="d-flex justify-content-center">
                                <div>
                                    <button class="btn btn-success">Edit</button>
                                    <button class="btn btn-danger">Delete</button>
                                </div>
                            </td>
                          </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div id="users">
                        <h4>Users</h4>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="col-2">First Name</th>
                                    <th class="col-2">Last Name</th>
                                    <th class="col-5">Mail</th>
                                    <th class="col-2">Phone</th>
                                    <th class="col-1"></th>
                                </tr>
                            </thead>
                            <tbody id="userList" class="table-group-divider">
                                <!-- <tr class="align-middle">
                                <th scope="row">Vadim</th>
                                <th>Bernard</th>
                                <td>test@test.tst</td>
                                <td>06.12.12.12.12</td>
                                <td class="d-flex justify-content-center">
                                    <button class="btn btn-danger">Delete</button>
                                </td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div id="orders">
                        <h4>Orders</h4>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="col-3">Customer</th>
                                    <th class="col-5">Order</th>
                                    <th class="col-1">State</th>
                                    <th class="col-1">Price</th>
                                    <th class="col-2"></th>
                                </tr>
                            </thead>
                            <tbody id="orderList" class="table-group-divider">
                                <!-- <tr class="align-middle">
                                <th scope="row">Vadim Bernard</th>
                                <td>pppppppppppppppppppppppppppppp ppppppppppppppppppppppppppp</td>
                                <td>Commande à livrer</td>
                                <td>1000 €</td>
                                <td>
                                    <button class="btn btn-secondary">Ship</button>
                                    <button class="btn btn-danger">Delete</button>
                                </td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="newProductModal" tabindex="-1" aria-labelledby="newProductModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="newProductForm">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="titleInput"
                                        placeholder="Name of the new Product" name="title" required>
                                    <label for="titleInput">Title</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="descriptionInput"
                                        placeholder="Little description of the product" name="description"
                                        style="height: 100px; /* resize: none; */" required></textarea>
                                    <label for="descriptionInput">Description</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" step="0.01" pattern="\d+(\.\d{1,2})?" class="form-control"
                                        id="priceInput" placeholder="Price (in €)" name="price" required>
                                    <label for="priceInput">Price</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" pattern="https?://.*\.(jpe?g|png|gif|bmp)" class="form-control"
                                        id="imageLinkInput" placeholder="PNG or JPEG link" name="imageLink" required>
                                    <label for="priceInput">Image Link</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="number" pattern="\d*" class="form-control" id="stockInput"
                                                placeholder="Stock" name="stock" required>
                                            <label for="stockInput">Stock</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="categoryInput"
                                                placeholder="Category" name="categorie" required>
                                            <label for="categoryInput">Category</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- <p class="errorMessage hide" id="errorLoginMessage">Error !</p> -->
                                <input type="submit" class="btn btn-success" id="addNewProductButton" value="Add">
                                <!-- <button class="btn btn-primary" id="loginButton">Login</button> -->
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModal"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editProductForm">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="editTitleInput"
                                        placeholder="Name of the new Product" name="title" required>
                                    <label for="editTitleInput">Title</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="editDescriptionInput"
                                        placeholder="Little description of the product" name="description"
                                        style="height: 100px; /* resize: none; */" required></textarea>
                                    <label for="editDescriptionInput">Description</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" step="0.01" pattern="\d+(\.\d{1,2})?" class="form-control"
                                        id="editPriceInput" placeholder="Price (in €)" name="price" required>
                                    <label for="editPriceInput">Price</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" pattern="https?://.*\.(jpe?g|png|gif|bmp)" class="form-control"
                                        id="editImageLinkInput" placeholder="PNG or JPEG link" name="imageLink" required>
                                    <label for="editImageLinkInput">Image Link</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="number" pattern="\d*" class="form-control" id="editStockInput"
                                                placeholder="Stock" name="stock" required>
                                            <label for="editStockInput">Stock</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="editCategoryInput"
                                                placeholder="Category" name="categorie" required>
                                            <label for="editCategoryInput">Category</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- <p class="errorMessage hide" id="errorLoginMessage">Error !</p> -->
                                <input type="submit" class="btn btn-success" id="addNewProductButton" value="Update">
                                <!-- <button class="btn btn-primary" id="loginButton">Login</button> -->
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>
<style scoped></style>
