provider "azurerm" {
    features {}

    subscription_id = var.subscription_id
    client_id       = var.client_id
    client_secret   = var.client_secret
    tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "az_group" {
    name     = "yernoor_rg"
    location = "East US"
}

resource "azurerm_virtual_network" "az_vnet" {
    name                = "yernoor_vnet"
    location            = azurerm_resource_group.az_group.location
    resource_group_name = azurerm_resource_group.az_group.name
    address_space       = ["10.0.0.0/16"]
}


resource "azurerm_subnet" "az_subnet" {
    name                 = "yernoor_subnet"
    resource_group_name  = azurerm_resource_group.az_group.name
    virtual_network_name = azurerm_virtual_network.az_vnet.name
    address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "az_public_ip_frontend" { 
    name                = "yernoor_public_ip_frontend"
    location            = azurerm_resource_group.az_group.location
    resource_group_name = azurerm_resource_group.az_group.name
    allocation_method   = "Dynamic"
}

resource "azurerm_public_ip" "az_public_ip_backend" { 
    name                = "yernoor_public_ip_backend"
    location            = azurerm_resource_group.az_group.location
    resource_group_name = azurerm_resource_group.az_group.name
    allocation_method   = "Dynamic"
}

resource "azurerm_network_interface" "az_nic_frontend" {
    name                = "yernoor_nic_frontend"
    location            = azurerm_resource_group.az_group.location
    resource_group_name = azurerm_resource_group.az_group.name

    ip_configuration {
        name                          = "internal"
        subnet_id                     = azurerm_subnet.az_subnet.id
        private_ip_address_allocation = "Dynamic"
        public_ip_address_id = azurerm_public_ip.az_public_ip_frontend.id
    }
}

resource "azurerm_network_interface" "az_nic_backend" {
    name                = "yernoor_nic_backend"
    location            = azurerm_resource_group.az_group.location
    resource_group_name = azurerm_resource_group.az_group.name

    ip_configuration {
        name                          = "internal"
        subnet_id                     = azurerm_subnet.az_subnet.id
        private_ip_address_allocation = "Dynamic"
        public_ip_address_id = azurerm_public_ip.az_public_ip_backend.id
    }
}

resource "azurerm_virtual_machine" "azvm_frontend" {
    name                  = "yernoorfrontend"
    location              = azurerm_resource_group.az_group.location
    resource_group_name   = azurerm_resource_group.az_group.name
    network_interface_ids = [azurerm_network_interface.az_nic_frontend.id]
    vm_size               = "Standard_DS1_v2"

    storage_image_reference {
        publisher = "Canonical"
        offer     = "UbuntuServer"
        sku       = "16.04-LTS"
        version   = "latest"
    }

    storage_os_disk {
        name              = "yernoorVmOsdiskfrontend"
        caching           = "ReadWrite"
        create_option     = "FromImage"
        managed_disk_type = "Standard_LRS"
    }

    os_profile {
        computer_name  = "yernoorfrontend"
        admin_username = "yernoor"
        admin_password = "Singularity2022!"
    }

    os_profile_linux_config {
        disable_password_authentication = false
    }
}

resource "azurerm_virtual_machine" "azvm_backend" {
    name                  = "yernoorbackend"
    location              = azurerm_resource_group.az_group.location
    resource_group_name   = azurerm_resource_group.az_group.name
    network_interface_ids = [azurerm_network_interface.az_nic_backend.id]
    vm_size               = "Standard_DS1_v2"

    storage_image_reference {
        publisher = "Canonical"
        offer     = "UbuntuServer"
        sku       = "16.04-LTS"
        version   = "latest"
    }

    storage_os_disk {
        name              = "yernoorVmOsdiskbackend"
        caching           = "ReadWrite"
        create_option     = "FromImage"
        managed_disk_type = "Standard_LRS"
    }

    os_profile {
        computer_name  = "yernoorbackend"
        admin_username = "yernoor"
        admin_password = "Singularity2022!"
    }

    os_profile_linux_config {
        disable_password_authentication = false
    }
}
