import React, { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/comp/Theme";

const Wrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	/* border-radius: 10px; */
	padding: 2px 5px;
	outline: none;
	transition: background-color 0.1s ease-in-out;
	&:hover {
		background-color: ${theme.colors.fontDark}50;
	}

	border-radius: 5px;

	font-size: 140px;

	@media (max-width: ${theme.breakpoint.md}) {
		font-size: 120px;
	}

	@media (max-width: ${theme.breakpoint.sm}) {
		font-size: 100px;
	}
`;

const Logo: FC = () => (
	<Link href="/" passHref>
		<Wrapper>
			<svg width="1.1em" height="0.4em" viewBox="0 0 278 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_219:35)">
					
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_219:35"
						x1="7.56416e-07"
						y1="35.9429"
						x2="278.161"
						y2="34.7733"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={theme.colors.brand} />
						<stop offset="1" stopColor={theme.colors.brandDark} />
					</linearGradient>
					<clipPath id="clip0_219:35">
						<rect width="278" height="68" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</Wrapper>
	</Link>
);

export default Logo;
