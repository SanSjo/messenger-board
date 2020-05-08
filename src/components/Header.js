import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

export const Header = () => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar style={styles.navbar} color="faded" light>
				<NavbarBrand style={styles.brand} className="mr-auto">
					Message board
				</NavbarBrand>
				<NavbarToggler
					style={styles.toggler}
					onClick={toggleNavbar}
					className="mr-2"
				/>
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<NavLink>Contact</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>About</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

const styles = {
	navbar: {
		background: '#fff',
	},
	brand: {
		color: '#eb5833',
	},
};
