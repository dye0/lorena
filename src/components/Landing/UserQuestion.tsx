import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Attention } from "../Attention";
import { Line } from "../Line";
import { LowerSlogan, Slogan } from "./common";
import Komi from "./Komi";

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MainText = styled(Slogan)`
	font-size: ${({ theme }) => theme.fontSize.l};
`;

const ClickableLink = styled.a`
	text-decoration: none;
`;

const UserQuestion: FC = () => (
	<ContentWrapper>
		<Line />
		<LowerSlogan>Sounds good?</LowerSlogan>
		<MainText>
			<Link href="/url" passHref>
				<ClickableLink>
					<Attention>Try it out</Attention>
				</ClickableLink>
			</Link>
		</MainText>
		<Link href="/uhhh" passHref>
				<ClickableLink>
					<Attention>try this out.. too! haha</Attention>
				</ClickableLink>
			</Link>
		<Komi />
	</ContentWrapper>
);

export default UserQuestion;
