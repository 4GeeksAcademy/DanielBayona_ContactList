const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			urlBase: "https://playground.4geeks.com/contact/agendas",
			contacts: [],
			
		},
		actions: {
			createAgenda: async () =>{
				try {
					let response = await fetch(`${getStore().urlBase}/DanielBayona`, {
						method: 'POST'
					})
					if (response.ok) {
					   console.log("Creado exitosamente");
					} else{
						console.log("Error al crear");
					}
					
				} catch (error) {
					console.log(error);
				}
			},
			getAllContacts: async () =>{
				try {
					let response = await fetch(`${getStore().urlBase}/DanielBayona/contacts`);
					let data = await response.json();
					if(response.ok){
						console.log(data.contacts);
						setStore({
							contacts: data.contacts,
						})
					} else{
						console.log("No existe el usuario");
						getActions().createAgenda();
					}
				} catch (error) {
					console.log(error);
				}
			},
			addContact: async (contact) =>{
				try {
					let response = await fetch(`${getStore().urlBase}/DanielBayona/contacts`,{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					})

					if(response.ok){
						await getActions().getAllContacts()
						return true
					} else{
						console.log('Ha ocurrido un error');
						return false
					}
					
				} catch (error) {
					console.log(error);
				}
			},
			deleteContact: async (id, slug = 'DanielBayona') =>{
				try {
					let response = await fetch(`${getStore().urlBase}/${slug}/contacts/${id}`,{
						method: "DELETE"
					})

					if(response.ok){
						getActions().getAllContacts();
						return true;
					} else{
						console.log('error al borrar contacto');
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			updateContact: async (id, updatedContact, slug = 'DanielBayona') => {
				try {
				  let response = await fetch(`${getStore().urlBase}/${slug}/contacts/${id}`, {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify(updatedContact),
				  });
				  if (response.ok) {
					getActions().getAllContacts();
					return true;
				  } else {
					console.log("error al actualizar contacto");
					return false;
				  }
				} catch (error) {
				  console.log(error);
				  return false;
				}
			  }  
		}
	};
};

export default getState;
