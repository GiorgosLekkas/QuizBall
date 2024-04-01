using Application.Core.Questions;
using AutoMapper;
using Domain;

namespace Application.Core {
    public class MappingProfiles : Profile {
        public MappingProfiles(){
            CreateMap<HistoryQuestion, HistoryQuestion>();
            CreateMap<QuestionGeography, QuestionGeography>();
            CreateMap<Question_Field, Question_Field>();

            CreateMap<Question_Field, Question_FieldDto>()
                .ForMember(d => d.AuthorName, o => o.MapFrom(s => s.Authors
                .FirstOrDefault(x => x.IsAuthor).Account.UserName));

            CreateMap<Account, Profiles.Profile>();

            CreateMap<QuestionAuthor, Profiles.Profile>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Account.UserName))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Account.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.Account.LastName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Account.Email))
                .ForMember(d => d.Role, o => o.MapFrom(s => s.Account.Role))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Account.Gender));
        }
    }
}