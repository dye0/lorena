import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { InferGetStaticPropsType } from "next";
import { useFormik } from "formik";
import CenteredCard from "@/comp/CenteredCard";
import Layout from "@/comp/layout";
import { Paths } from "@/conf/paths";
import { ExternalUrl } from "@/comp/Url";
import Embed from "@/comp/Embed";

const Title = styled.h1`
	text-transform: uppercase;
	text-align: center;
	color: ${({ theme }) => theme.colors.background};
	margin-top: 10px;
	font-size: ${({ theme }) => theme.fontSize.l};
	overflow-wrap: break-word;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Content = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.background};
	margin-top: 10px;
	padding: 5px;
`;

const Text = styled.span`
	color: ${({ theme }) => theme.colors.background};
	font-size: 1.2em;
	text-align: center;
`;

const Select = styled.select`
	margin: 5px 5px;
	font-size: 1em;
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.background};
	border: none;
	padding: 5px;
	border-radius: 5px;
	outline: none;
	box-shadow: ${({ theme }) => theme.shadow.primary};

	transition: all 0.1 ease-in-out;

	&:focus {
		box-shadow: ${({ theme }) => theme.shadow.primary}, 0 0 0 3px ${({ theme }) => theme.colors.brand};
	}
`;

const Input = styled.input`
	margin: 5px 5px;
	font-size: 1em;
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.background};
	border: none;
	padding: 5px;
	border-radius: 5px;
	outline: none;
	box-shadow: ${({ theme }) => theme.shadow.light};
	transition: all 0.1 ease-in-out;

	&:focus {
		box-shadow: ${({ theme }) => theme.shadow.primary}, 0 0 0 2px ${({ theme }) => theme.colors.brand};
	}
`;

const Messsage = styled(Title)`
	margin-top: 10px;
	/* font-size: ${({ theme }) => theme.fontSize.m}; */
	color: ${({ theme }) => theme.colors.background};
`;

const Url = styled(ExternalUrl)`
	margin: 10px 0 0 0;
	color: ${({ theme }) => theme.colors.background};
	text-decoration: underline;
	text-align: center;
	max-width: 400px;
	word-wrap: break-word;
`;

const Line = styled.hr`
	width: 100%;
	height: 2px;
	border: 0;
	background-color: ${({ theme }) => theme.colors.background};
	margin-top: 20px;
`;

const EmbedWrapper = styled.div`
	margin-top: 10px;
`;

export const getStaticProps = async () => {
	const paths = Object.keys(Paths);

	return {
		props: {
			paths,
		},
	};
};

const randomImage = (value: string) =>
	Paths[value].placeholders[Math.floor(Math.random() * Paths[value].placeholders.length)];

const CreateUrl: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ paths }) => {
	const [hostname, setHostname] = useState("");

	useEffect(() => {
		setHostname(window.location.host);
	}, []);

	const formik = useFormik({
		initialValues: {
			author: "",
			reciever: "",
			action: "to-cuddle",
		},
		onSubmit: () => {},
	});

	const [searchParams, setSearchParams] = useState("");

	const [embedImage, setEmbedAction] = useState(randomImage(formik.values.action));

	useEffect(() => {
		if (!formik.values.author && !formik.values.reciever) return setSearchParams("");

		const params = new URLSearchParams();

		if (formik.values.author) params.append("from", formik.values.author);
		if (formik.values.reciever) params.append("to", formik.values.reciever);

		return setSearchParams(`?${params.toString()}`);
	}, [formik.values]);

	useEffect(() => {
		setEmbedAction(randomImage(formik.values.action));
	}, [formik.values.action]);

	const url = `http${process.env.NODE_ENV === "development" ? "" : "s"}://${hostname}/${
		formik.values.action
	}${searchParams}`;

	return (
		<Layout animate>
			<CenteredCard>
				<Title>Create your URL!</Title>
				<Content onSubmit={formik.handleSubmit}>
					<Text>
						I,{" "}
						<Input
							id="author"
							name="author"
							placeholder="methiu"
							onChange={formik.handleChange}
							value={formik.values.author}
						/>{" "}
						want{" "}
						<Select id="action" name="action" onChange={formik.handleChange} value={formik.values.action}>
							{paths.map((path) => (
								<option key={path} value={path}>
									{path.replace(/-/g, " ")}
								</option>
							))}
						</Select>{" "}
						with{" "}
						<Input
							id="reciever"
							name="reciever"
							onChange={formik.handleChange}
							value={formik.values.reciever}
							placeholder="my girlfriend"
						/>
						.
					</Text>
				</Content>
				<Line />
				<Wrapper>
					<Messsage>Preview:</Messsage>
					<EmbedWrapper>
						<Embed
							title={Paths[formik.values.action].message(formik.values.reciever, formik.values.author)}
							url={embedImage}
						/>
					</EmbedWrapper>
					<Url href={url}>{url}</Url>
				</Wrapper>
			</CenteredCard>
		</Layout>
	);
};

export default CreateUrl;
